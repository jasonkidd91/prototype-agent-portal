import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { PackageDetailsComponent } from '../package-details/package-details.component';
import { MatDialog } from '@angular/material';
import { ComponentService } from 'src/app/services/component.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  testimonials$ = [
    { name: 'Taylor Swift', rating: 5, comment: 'You guys rocked on the sculpture project! Thanks so much for doing a great job!' },
    { name: 'Arvil Lavinge', rating: 4, comment: 'Fantastic Platform, I Love It!' },
    { name: 'Andy Lau', rating: 5, comment: 'I got my loan approved within 4 weeks! Thanks to Agent Portal!' },
    { name: 'Tony Stark', rating: 4, comment: 'BEST RATE EVER!!' },
    { name: 'Ryan Reynold', rating: 5, comment: 'Yeah!' }
  ];
  dummyPackages$ = [
    { id: 1, name: 'Bank A', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://previews.123rf.com/images/cteconsulting/cteconsulting1501/cteconsulting150100037/35382268-an-image-of-a-3d-free-gift-icon-.jpg" },
    { id: 2, name: 'Bank B', benefit: ["6.04% interests", "Up to 60yrs", "No Processing Fees", "Respond in 3 weeks", "1x Car Camera"], url: "https://naturallooks.com.my/wp-content/uploads/2017/11/Free_Gift-1.png" },
    { id: 3, name: 'Bank C', benefit: ["3.13% interests", "Up to 70yrs", "No Processing Fees", "Respond in 3 weeks", "1x RM200 AEON Voucher"], url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaIPwUYG69-kz4JeUVdrFpuSAVUdTpQippLv3flWv3WK6xZ7W0" },
    { id: 4, name: 'Bank D', benefit: ["3.99% interests", "Up to 80yrs", "No Processing Fees", "Respond in 4 weeks", "1x 4GB Pen Drive"], url: "https://marketplace.magento.com/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/f/r/freegift.png" },
    { id: 5, name: 'Bank E', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://marketplace.magento.com/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/s/m/smartgft.jpg" },
    { id: 6, name: 'Bank F', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"] },
    { id: 7, name: 'Bank G', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"] },
    { id: 8, name: 'Bank H', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 9, name: 'Bank I', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 10, name: 'Bank J', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 11, name: 'Bank K', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 12, name: 'Bank L', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 13, name: 'Bank M', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 14, name: 'Bank N', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 15, name: 'Bank O', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 16, name: 'Bank P', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 17, name: 'Bank Q', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 18, name: 'Bank R', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" },
    { id: 19, name: 'Bank S', benefit: ["5.00% interests", "Up to 50yrs", "No Processing Fees", "Respond in 2 weeks", "1x Lugage Bag"], url: "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg" }
  ];
  private currentBreakpoint: string;

  constructor(private router: Router,
    public dialog: MatDialog, private cs: ComponentService) { }

  ngOnInit() {
    const breakpoint = this.breakpoint(window.innerWidth);
    this.currentBreakpoint = breakpoint;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const breakpoint = this.breakpoint(event.target.innerWidth);
    // console.log("Width: " + event.target.innerWidth + ", Breakpoint: " + breakpoint);
    if (this.currentBreakpoint != breakpoint) {
      this.currentBreakpoint = breakpoint;
    }
  }

  breakpoint(width) {
    if (width >= 1920) {
      return 'xl';
    } else if (width >= 1280) {
      return 'lg';
    } else if (width >= 960) {
      return 'md';
    } else if (width >= 600) {
      return 'sm';
    } else {
      return 'xs';
    }
  }

  itemsPerSlide(): number {
    const breakpoint = this.currentBreakpoint;
    switch (breakpoint) {
      case 'xl':
      case 'lg':
      case 'md':
        return 4;
      case 'sm':
        return 3;
      case 'xs':
        return 2;
      default:
        return 1;
    }
  }

  totalPages() {
    const totalPages = Math.ceil(this.dummyPackages$.length / this.itemsPerSlide());
    return new Array(totalPages);
  }

  packageList(slidePage): Array<any> {
    const itemsPerPage = this.itemsPerSlide();
    const startIndex = slidePage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return this.dummyPackages$.slice(startIndex, endIndex);
  }

  stylePackage(_package) {
    if (!_package) {
      return {};
    }
    const imageUrl = _package.url ? _package.url : "https://www.mageants.com/media/catalog/product/optimized/3/3/333f795cfa8f71790e7b0c4ed436a01b/free_gidt.jpg";
    return {
      'background': `url(${imageUrl})`,
      'background-position': 'center center',
      'background-repeat': 'no-repeat',
      'background-size': '100% auto',
      // 'background-color': 'grey'
    }
  }

  viewPackages() {
    this.router.navigate(['../packages']);
  }

  packageDetails() {
    this.cs.openModal(PackageDetailsComponent);
  }

}
