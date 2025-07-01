import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { ProductService } from 'app/services/product.service';
import { CategoryService } from 'app/services/category.service';
import { ProductRequest } from 'app/models/product-request';
import { ProductResponseDto } from 'app/models/product-response-dto';
declare var bootstrap: any;
declare var $: any;
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  selectedFile: File | null = null;
  modalInstance: any;
  editModalInstance:any;
  categoryMap: { [cid: string]: string } = {};
  productResposne:Product[]=[];
  productRequest:ProductRequest|null=null;
  productResponseDto:ProductResponseDto |null=null;
  category: Category | null = null;
   constructor(private fb: FormBuilder, private http: HttpClient,private productService:ProductService,private categoryService:CategoryService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      price: [null, Validators.required],
      discountPercent: [null,Validators.required],
      brand: ['',Validators.required],
      stockQuantity: [null,Validators.required],
      categoryname: ['', Validators.required]
    });
  }
  productImage:boolean=false;
  editProductImage:File|null=null;
  editProductImageUrl: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.productResposne=data;

        // Loop through all products and call getCategoryById for each categoryId
      this.productResposne.forEach(product => {

        this.getCategoryById(product.categoryId);
      });
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.showNotification('top','right',"Erro comes while hit the api "+err,'danger')
      }
    });
  }
  loadCategories(): void {
    this.http.get<Category[]>('http://localhost:8081/api/categories/get') // Adjust URL
      .subscribe(data => this.categories = data);
  }

  getCategoryById(cid:string): void {
    if (cid && this.categoryMap[cid]==null) {
    this.categoryService.getCategoryById(cid).subscribe({
      next: (data) => {
        this.categoryMap[cid] = data.name;
      },
      error: (err) => {
        console.error('Error loading category', err);
        this.categoryMap[cid] = 'Unknown';
      }
    });
  }
  } 
   onFileSelected(event: any): void {
    this.productImage=false;
    this.selectedFile = event.target.files[0];
    // alert(this.selectedFile)
    // this.productImage=true
    // // this.editProductImage=this.selectedFile;
    //  if (this.selectedFile) {
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.editProductImage = (reader.result as string).split(',')[1]; // Remove data:image prefix
    //   this.productImage = true;
    // };
    // reader.readAsDataURL(this.selectedFile);
  }
  onEditFileSelected(event:any):void{
    const file = event.target.files[0];
  if (file) {
    this.editProductImage = file; // save file
    this.productImage = true;

    const reader = new FileReader();
    reader.onload = () => {
      this.editProductImageUrl = reader.result as string; // base64 string for preview
    };
    reader.readAsDataURL(file);
  }
  }
  
  openModal() {
    console.log("open modal")
     const modalElement = document.getElementById('addProductModal');
  if (modalElement) {
    this.modalInstance = new bootstrap.Modal(modalElement);
    this.modalInstance.show();
  }
  }
  openEditModal(){
    const editModalElement=document.getElementById('editProductModal');
    if(editModalElement){
      this.editModalInstance=new bootstrap.Modal(editModalElement);
      this.editModalInstance.show()
    }
  }
  closedEditModal(){
    // const editModalElement=document.getElementById('editProductModal');
    // if(editModalElement){
    //   this.editModalInstance=new bootstrap.Modal(editModalElement);
    //   this.editModalInstance.show()
    // }
    this.productForm.reset();
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
    if (this.editModalInstance) {
      this.editModalInstance.hide();
    }
  }
  selectedProductId:string=''
  editProduct(product:Product){
  //   console.log("edit ")
  //   this.productImage=true;
  //    this.editProductImageUrl = 'data:image/jpeg;base64,' + product.image;
  //   this.editProductImage=product.image;
  //   this.showNotification('top','right',"edit button clicked",'info');
  //     // this.openModal();
  //   this.productForm.patchValue({
  //   name: product.name,
  //   description: product.description,
  //   price: product.price,
  //   discountPercent: product.discountPercent,
  //   brand: product.brand,
  //   stockQuantity: product.stockQuantity,
  //   categoryname: this.categoryMap[product.categoryId]

  // });

     this.selectedProductId = product.id; // capture product ID

  this.productForm.patchValue({
    name: product.name,
    description: product.description,
    price: product.price,
    discountPercent: product.discountPercent,
    brand: product.brand,
    stockQuantity: product.stockQuantity,
    categoryname: this.categoryMap[product.categoryId] || "Unknown"
  });

  this.editProductImageUrl = 'data:image/jpeg;base64,' + product.image;
  this.editProductImage = null;
  this.productImage = true;
  
  
  //   const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
  // modal.show();

    // this.productForm.stoc
  //    this.productForm.patchValue({
  //   name: product.name,
  //   description: product.description,
  //   price: product.price,
  //   discountPercent: product.discountPercent,
  //   brand: product.brand,
  //   stockQuantity: product.stockQuantity,
  //   categoryname: product.categoryname
  // });

  // Show modal
  // this.openModal();
  this.openEditModal();
    
  }

  deleteProduct(pid:string):void{
    this.productService.deleteProduct(pid).subscribe({
    next: (res) => {
      this.showNotification('top', 'right', res, 'success');
      this.loadProducts();
      this.closedEditModal(); // close modal
      // optionally refresh product list
    },
    error: (error) => {
      console.error('Delete Product Failed', error);
      this.showNotification('top', 'right', 'Delete Product Failed', 'danger');
    }
  });

  }

  onEditSubmit(){
    console.log("edit submit")

    if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  const formData = new FormData();

  const productPayload = {
    name: this.productForm.get('name')?.value,
    description: this.productForm.get('description')?.value,
    price: this.productForm.get('price')?.value,
    discountPercent: this.productForm.get('discountPercent')?.value,
    brand: this.productForm.get('brand')?.value,
    stockQuantity: this.productForm.get('stockQuantity')?.value,
    categoryname: this.productForm.get('categoryname')?.value
  };

  // formData.append('product', new Blob([JSON.stringify(productPayload)], { type: 'application/json' }));

  formData.append('product', JSON.stringify(productPayload));

  if (this.editProductImage) {
    formData.append('image', this.editProductImage);
  }

  this.productService.updateProduct(this.selectedProductId, formData).subscribe({
    next: (res) => {
      this.showNotification('top', 'right', res, 'success');
      this.loadProducts();
      this.closedEditModal(); // close modal
      // optionally refresh product list
    },
    error: (error) => {
      console.error('Update failed', error);
      this.showNotification('top', 'right', 'Product update failed', 'danger');
    }
  });
  }
   onSubmit(): void {
    // if (!this.selectedFile || this.productForm.invalid) {
    //   alert('Please fill all required fields and choose an image.');
    //   return;
    // }
   if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    this.showNotification('top','right',"Please first fill all the fields required",'danger')
    return;
  }
    
    const product: ProductRequest = this.productForm.value;
    const formData = new FormData();
    formData.append('productdata', JSON.stringify(product));
    formData.append('prodcutimage', this.selectedFile);

    this.http.post('http://localhost:8081/api/products/add', formData,{ responseType: 'text' })
      .subscribe({
        next: (res) => {
          // this.showNotification(toStrin)
          this.showNotification('top','right',res,'success');
          this.loadProducts();
          this.productForm.reset();
          this.selectedFile = null;
          this.fileInput.nativeElement.value = '';

          // ✅ Close modal
          if (this.modalInstance) {
            this.modalInstance.hide();
          }
        },
        error: err => alert('Upload failed: ' + err.message)
      });
  }
  closeModal(){
    this.productForm.reset();
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

 isInvalid(field: string): boolean {
  const control = this.productForm.get(field);
  
  return !!(control && control.invalid && (control.touched || control.dirty));
}
  showNotification(from, align,msg,errortype){
      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: msg

      },{
          type: errortype,
          timer: 2000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

}
