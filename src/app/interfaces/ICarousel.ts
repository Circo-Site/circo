import { SafeResourceUrl } from "@angular/platform-browser";

export interface ICarousel {
    src: SafeResourceUrl,
    title?: string,
    desc?: string,
    routerLink?: string
}
