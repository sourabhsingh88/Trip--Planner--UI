import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {

  package = {
    // imageUrl: 'https://your-backend.com/images/package1.jpg',
    name: 'Char Dham Yatra',
    price: 15000,
    trip_from: 'Delhi',
    trip_to: 'Badrinath'
  };

  status = 3; // Mock status for demonstration

  constructor() {}

  ngOnInit(): void {}
}
