import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Product } from '../../model/product.model';
import { GrocessaryService } from '../../service/grocessary.service';

@Component({
  selector: 'app-grocessary-list',
  templateUrl: './grocessary-list.component.html',
  styleUrls: ['./grocessary-list.component.css']
})
export class GrocessaryListComponent implements OnInit {
  //Product is comming from model class line and line 14 meaning same
 //productList: Product[]= [];
  productList : Array<Product>= [];
  constructor(
    private gService:GrocessaryService,
    private router:Router
  ) { 
    this.getProductList();
  }

  ngOnInit(): void {
  }
getProductList(): void {
    this.gService.getProductlist().pipe(take(1)).subscribe(
      (res: any) => {
        console.log("*******",res);
        if(!!res && Array.isArray(res)){
          this.productList= res;
        }
      }, err =>{
        console.log("Error");
      }
    )
}
delProduct(product: Product): void {
  this.gService.deleteProduct(product?.productId).pipe(take(1)).subscribe(
    (res:any)=>{
      alert("Product deleted sucessfully");
      this.getProductList();
    }, err =>{
        console.log("Error");
      }
  )
}
editProduct(product:Product):void{
  this.router.navigate(['/admin/addproduct'], { queryParams: {
    id: product?.productId
  }});

}

}
