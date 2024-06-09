import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import * as NFC from 'nfc-pcsc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private nfc: any;
  constructor(
    private router: Router) {
    // this.nfc = new NFC();
    // this.nfc.on('reader', this.handleReader.bind(this)); 
  }

    // handleReader(reader: any) {
    //   console.log(`${reader.reader.name} reader detected`);
  
    //   reader.on('card', this.handleCard.bind(this));
    //   reader.on('card.off', this.handleCardRemoved.bind(this));
    // } handleCard(card: any) {
    //   console.log(`Card detected: ${card.uid}`);
    //   // Perform further operations with the card data
    // }
  
    // handleCardRemoved() {
    //   console.log('Card removed');
    // }
    
  ngOnInit(): void {
    console.log('HomeComponent INIT');

  // this. reader
  //   .read(console.log(`${this.reader.reader.name}  device attached`)  ).then(
      
  // //     this.reader.on('card',   card  => {


	// // 	console.log(`${this.reader.reader.name}  card detected`, card);

	// // }) 
  //   )
    
    
  }

}
