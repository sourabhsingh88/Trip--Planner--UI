import { Component, OnInit } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { GalleryService } from 'src/app/service/gallery-service';

@Component({
    selector: 'app-gallery-page',
    templateUrl: './gallery-page.component.html',
    styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit {

    constructor(private galleryService: GalleryService) { }

    ngOnInit(): void {
        this.getImages();
        window.addEventListener('scroll', this.onScroll, true);
    }


    settings = {
        counter: false,
        plugins: [lgZoom]
    };
    onBeforeSlide = (detail: BeforeSlideDetail): void => {
        const { index, prevIndex } = detail;
        console.log(index, prevIndex);
    };
    public images: any[] = [];
    public page = 0;
    public size = 5;
    public loading = false;
    public lastPage = false;

    getImages(): void {
        if (this.loading || this.lastPage) return;

        this.loading = true;
        this.galleryService.getAllImages(this.page, this.size).subscribe(
            (response) => {
                const newImages = response.data || [];
                this.images.push(...newImages);

                if (newImages.length < this.size || this.images.length >= response.totalRecords) {
                    this.lastPage = true;
                }

                this.page++;
                this.loading = false;
            },
            (error) => {
                console.error(error);
                this.loading = false;
            }
        );
    }
    onScroll = (): void => {
        const threshold = 10000;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;

        if ((scrollTop + windowHeight + threshold) >= bodyHeight) {
            this.getImages();
        }
    };

}