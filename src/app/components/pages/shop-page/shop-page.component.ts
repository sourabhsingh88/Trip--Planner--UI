import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { TripService } from 'src/app/service/trip-service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent  {


  filterData = {
    to: '',
    from: '',
    duration: null,
    price: null,
    keyword: ''
  };

  page = 0;
  size = 12;
  trips: any[] = [];

  private filterSubject = new Subject<void>();


  isOpen = false;
  selectedOption: string | null = null;
  options = ['Option 1', 'Option 2', 'Option 3'];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }
  constructor(private tripService: TripService) { 
    this.filterSubject.pipe(debounceTime(500)).subscribe(() => {
      this.loadFilteredTrips();
    });
    
  }
  ngOnInit(): void {
    this.loadFilteredTrips(); // ✅ API call on component load
  }
  onFilterChange() {
    this.filterSubject.next(); // triggers the API call after 500ms pause
  }

  totalRecords = 0;
totalPages = 0;
totalPagesArray: number[] = [];

loadFilteredTrips() {
  this.tripService.filterTrips(this.page, this.size, this.filterData).subscribe({
    next: (res: any) => {
      this.trips = res.data;
      this.totalRecords = res.totalRecords;
      this.totalPages = Math.ceil(this.totalRecords / this.size);
      this.totalPagesArray = Array(this.totalPages).fill(0);
    },
    error: err => console.error("Filter Error:", err)
  });
}

goToPage(pageIndex: number) {
  this.page = pageIndex;
  this.loadFilteredTrips();
}

nextPage() {
  if (this.page < this.totalPages - 1) {
    this.page++;
    this.loadFilteredTrips();
  }
}

prevPage() {
  if (this.page > 0) {
    this.page--;
    this.loadFilteredTrips();
  }
}

  

   
}
