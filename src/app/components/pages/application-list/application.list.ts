import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationService } from 'src/app/service/application-service';
import { ApplicationComponent } from '../application/application.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application.list.html',
  styleUrls: ['./application.list.scss']
})
export class ApplicationListComponent implements OnDestroy {
  public applications: any[] = [];
  userId = parseInt(localStorage.getItem('userId')!, 10);
  page = 0;
  size = 5;
  loading = false;
  lastPage = false;

  constructor(
    private applicationService: ApplicationService,
    private dialog: MatDialog
  ) {
    this.getApplications(this.userId);
    window.addEventListener('scroll', this.onScroll, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll, true);
  }

  getApplications(userId: number): void {
    if (this.loading || this.lastPage) return;

    this.loading = true;
    this.applicationService.findAllByUserId(userId, this.page, this.size).subscribe(
      (response) => {
        const newApplics = response.data || [];
        this.applications.push(...newApplics);

        if (newApplics.length < this.size || this.applications.length >= response.totalRecords) {
          this.lastPage = true;
        }

        this.page++;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        alert(error.error?.message || 'Error fetching applications');
        this.loading = false;
      }
    );
  }

  onScroll = (): void => {
    const threshold = 200;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if ((scrollTop + windowHeight + threshold) >= bodyHeight) {
      this.getApplications(this.userId);
    }
  };

  openApplyDialog(): void {
    const dialogRef = this.dialog.open(ApplicationComponent, {
      width: '600px',
      maxHeight: '90vh',
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      // Refresh applications list
      this.page = 0;
      this.applications = [];
      this.lastPage = false;
      this.getApplications(this.userId);
    });
  }
 handleApplyClick(): void {
  if (this.hasApprovedApplication()) {
    alert("You already have an approved application.");
    return;
  }

  const dialogRef = this.dialog.open(ApplicationComponent, {
    width: '600px',
    maxHeight: '90vh',
    autoFocus: false,
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(() => {
    this.page = 0;
    this.applications = [];
    this.lastPage = false;
    this.getApplications(this.userId);
  });
}

// ✅ Check if any application is approved
hasApprovedApplication(): boolean {
  return this.applications.some(app => app.statusName === 'Approved');
}


}
