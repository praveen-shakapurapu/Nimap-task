import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JsonServerService } from '../service/json-server.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  constructor(private router: Router,private serv: JsonServerService,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private registeref:MatDialogRef<UpdateComponent>){}

ngOnInit(){
  this.getUser()
}

  reactiveForm = new FormGroup({
    image:new FormControl(''),
    name:new FormControl('',[Validators.required, Validators.maxLength(20),Validators.pattern('[A-Za-z]+')]),
    lastname:new FormControl('',),
    email:new FormControl(''),
    mobile:new FormControl(''),
    age:new FormControl(''),
    state:new FormControl(''),
    country:new FormControl(''),
    address:new FormControl(''),
    tags:new FormControl(''),
    checked:new FormControl('')
  })



  fdata:any
  userData:any
  userID:any
  getUser(){
    this.serv.getDetails().subscribe((data)=>{
        this.fdata=data
        for(let d of this.fdata){
          if(d.id == this.editdata){
            this.userData=d
          }
        }
        console.log(this.userData)

        this.userID=this.userData.id
        // this.file1?.patchValue(this.userData.file1)
        this.name?.patchValue(this.userData.name)
        this.lastname?.patchValue(this.userData.lastname)
        this.email?.patchValue(this.userData.email)
        this.mobile?.patchValue(this.userData.mobile)
        this.age?.patchValue(this.userData.age)
        this.state?.patchValue(this.userData.state)
        this.country?.patchValue(this.userData.country)
        this.address?.patchValue(this.userData.address)
        this.tags?.patchValue(this.userData.tags)
        this.checked?.patchValue(this.userData.checked)
        this.imgurl=this.userData.image
    })
  }

  imgurl:any
  imgurl1:any
  onImageChange(e:any) {

    if(e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload=(images:any)=>{
        this.imgurl1=images.target.result
        console.log("image path",this.imgurl)
      }
    }

  }

  updatePage(){
    debugger
    this.router.navigate(['/user', this.userData.id])
    this.registeref.close()
  }

  cls:any
  updatesubForm(){
    this.image?.patchValue(this.imgurl)
    // this.userData.image = this.imgurl;
    console.log(this.reactiveForm.value)
    this.serv.updateUser(this.reactiveForm.value,this.userID).subscribe(()=>{
      alert('data Update Successfully!')
    })
    location.reload();
  }

  get image(){
    return this.reactiveForm.get('image')
  }

  get name(){
    return this.reactiveForm.get('name')
  }

  get lastname(){
    return this.reactiveForm.get('lastname')
  }
  get email(){
    return this.reactiveForm.get('email')
  }
  get mobile(){
    return this.reactiveForm.get('mobile')
  }
  get age(){
    return this.reactiveForm.get('age')
  }
  get state(){
    return this.reactiveForm.get('state')
  }
  get country(){
    return this.reactiveForm.get('country')
  }
  get address(){
    return this.reactiveForm.get('address')
  }
  get tags(){
    return this.reactiveForm.get('tags')
  }
  get checked(){
    return this.reactiveForm.get('checked')
  }

  formatLabel(value: number): string {

    return `${value}`;
  }

feildintrest:any=[]
num:any =1
  intrest(val:any){
   let obj:any={}

    obj["id"]=this.num
    obj["data"]=val
    this.feildintrest.push(obj)
    console.log(this.feildintrest)
    this.num++
  }

  cross(pid:any){
    console.log(pid)
    for(let obj in this.feildintrest){
      if(this.feildintrest[obj].id == pid){
        this.feildintrest.splice(obj,1)
      }
      else{
        console.log('invalid data!')
      }
    }


  }

}
