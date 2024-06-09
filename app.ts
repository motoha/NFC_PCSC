import { app, BrowserWindow, ipcMain } from 'electron';
import * as url from 'url';
import * as path from 'path';
import { NFC } from 'nfc-pcsc';

type ReaderType = {
  reader: {
    name: string
  },
  on: (event: string, callback: (data: any) => void) => void
  read: (blockNumber: number, length: number) => Promise<Buffer>
  write: (blockNumber: number, data: Buffer) => Promise<void>
};

const nfc = new NFC(); // optionally you can pass logger

let mainWindow: BrowserWindow | null;
let nfcReader: ReaderType | null = null;

async function initNfcReader() {
  nfc.on('reader', (reader: ReaderType) => {
    nfcReader = reader;
    console.log(`${reader.reader.name}  device attached`);
    reader.on('card', (card: any) => {
      console.log(`${reader.reader.name}  card detected`, card);

    });
    reader.on('card.off', (card: any) => {
      console.log(`${reader.reader.name}  card removed`, card);
    });
    reader.on('error', (err: any) => {
      console.log(`${reader.reader.name}  an error occurred`, err);
    });
    reader.on('end', () => {
      console.log(`${reader.reader.name}  device removed`);
    });
  });
  nfc.on('error', (err: any) => {
    console.log('an error occurred', err);
  });
}

function handleApi (): void {
  ipcMain.handle('ping', () => 'pong')
}
function handleNfc (): void {
  //ipcMain.handle('nfc-init', initNfcReader)
  ipcMain.handle('nfc-read', async (event, data) => {
    if (!nfcReader) {
      return Promise.reject(new Error('NFC reader not initialized'));
    }
    try {
      const data = await nfcReader.read(4, 12); // starts reading in block 4, continues to 5 and 6 in order to read 12 bytes
      console.log(`data read`, data);
      const payload = data.toString(); // utf8 is default encoding
      console.log(`data converted`, payload);
    } catch (err) {
      console.error(`error when reading data`, err);
    }
  });
  ipcMain.handle('nfc-write', async (event, data: string) => {
    console.log(`writing data: ${data}`);
    if (!nfcReader) {
      return Promise.reject(new Error('NFC reader not initialized'));
    }
    try {
      const data = Buffer.allocUnsafe(12);
      data.fill(0);
      const text = (new Date()).toTimeString();
      data.write(text); // if text is longer than 12 bytes, it will be cut off
      // reader.write(blockNumber, data, blockSize = 4)
      await nfcReader.write(4, data); // starts writing in block 4, continues to 5 and 6 in order to write 12 bytes
      console.log(`data written`);

    } catch (err) {
      console.error(`error when reading data`, err);
    }
  });
}
function createWindow (): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/electron-app/browser/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  handleApi();
  initNfcReader();
  handleNfc();
  createWindow();
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
