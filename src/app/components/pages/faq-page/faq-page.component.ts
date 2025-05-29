import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-faq-page',
    templateUrl: './faq-page.component.html',
    styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    accordionItems = [
        {
            title: 'Where Should You Look For Inspiration?',
            content: `Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel aliquet quam id dui posuere blandit Contact Us.`,
            open: false
        },
        {
            title: 'How To Craft Great Podcast Interview Questions?',
            content: `Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel aliquet quam id dui posuere blandit Contact Us.`,
            open: false
        },
        {
            title: 'What Do You Want To Learn?',
            content: `Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel aliquet quam id dui posuere blandit Contact Us.`,
            open: false
        },
        {
            title: 'Is It A Conversation You’d Eavesdrop Into?',
            content: `Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel aliquet quam id dui posuere blandit Contact Us.`,
            open: false
        },
        {
            title: 'What Do You Think Your Mission In Life Is?',
            content: `Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel aliquet quam id dui posuere blandit Contact Us.`,
            open: false
        },
        {
            title: 'What Are You Passionate About In Life?',
            content: `Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel aliquet quam id dui posuere blandit Contact Us.`,
            open: false
        }
    ];

    selectedItem : any = null;

    toggleAccordionItem(item:any) {
        item.open = !item.open;
        if (this.selectedItem && this.selectedItem !== item) {
            this.selectedItem.open = false;
        }
        this.selectedItem = item;
    }

}