import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { JsonServerService } from '../service/json-server.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  newimageUrl: any
  constructor(private registeref: MatDialogRef<any>, private router: Router, private serv: JsonServerService) { }
  reactiveForm = new FormGroup({
    image: new FormControl(""),
    name: new FormControl("",[Validators.required, Validators.pattern('[A-Za-z]+'),Validators.maxLength(20)]),
    lastname: new FormControl("",),
    email: new FormControl("", ),
    mobile: new FormControl("", ),
    age: new FormControl("", ),
    state: new FormControl("", ),
    country: new FormControl("", ),
    address: new FormControl("", ),
    tags: new FormControl("", ),
    checked: new FormControl("", ),

  })

  get image() {
    return this.reactiveForm.get('image')
  }

  get name() {
    return this.reactiveForm.get("name")
  }

  get lastname() {
    return this.reactiveForm.get("lastname")
  }

  get email() {
    return this.reactiveForm.get("email")
  }

  get mobile() {
    return this.reactiveForm.get("mobile")
  }

  imagee: any;
  imageUrl: any = "https://cdn3.iconfinder.com/data/icons/business-vol-26/100/Artboard_2-1024.png";
  imgValid: boolean = false;

  handleFileInput(event: any) {
    debugger;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        this.imagee = e.target.result;
        img.onload = () => {
          if (file.size < 310 * 325) {
            this.imgValid = true;
            console.log("Image uploaded successfully.");
          } else {
            this.imgValid = false;
            alert("Image dimensions exceed the maximum allowed size (310x325 pixels).");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }


  cls: any
  subForm() {
    debugger
    // this.reactiveForm.patchValue({
    //   image: this.imageUrl
    // })

    
    this.reactiveForm.controls['image'].patchValue(this.imagee)
    
    const data = this.reactiveForm.value
    console.log(data);
    
    this.serv.addUser(data).subscribe((res:any) => {
      console.log(res);
    this.registeref.close()
      this.router.navigate(['/user', res.id])
      alert( " Added to json server")
    })

    // this.image?.patchValue(this.imageUrl);
    // this.serv.addUser(this.imageUrl).subscribe(() => {
    // alert('Data added Successfully!');
    // });
    // location.reload(); 

    // const formData = new FormData()

    // formData.append('imageUrl', this.imageUrl)
    // this.image?.patchValue(this.imageUrl);

    // const formValue = this.reactiveForm.value;

    // for (const key of Object.keys(formValue)) {
    //   formData.append(key, (formValue as any)[key]);
    // }

  



    // Object.entries<any>(this.reactiveForm.value).forEach(([key,value])=>{
    //   formData.append(key, value)
    // })
    // this.name?.patchValue(this.name.value);
    // this.lastname?.patchValue(this.lastname.value);
    // this.email?.patchValue(this.email.value);

    // this.serv.addUser(formData).subscribe(() => {
    //   alert('Data added Successfully!');
    // });

    // location.reload(); 



  }


  // newPage(name: any) {
  //   this.registeref.close()
  //   this.router.navigate(['/user', name])
  // }

  formatLabel(value: number): string {
    return `${value}`;
  }

  feildintrest: any = []
  num: any = 1
  intrest(val: any) {
    let obj: any = {}

    obj["id"] = this.num
    obj["data"] = val
    this.feildintrest.push(obj)
    console.log(this.feildintrest)
    this.num++
  }

  cross(pid: any) {
    console.log(pid)
    for (let obj in this.feildintrest) {
      if (this.feildintrest[obj].id == pid) {
        this.feildintrest.splice(obj, 1)
      }
      else {
        console.log('invalid data!')
      }
    }
  }

}

