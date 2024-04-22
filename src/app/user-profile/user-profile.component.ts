import { Component, ElementRef, ViewChild } from '@angular/core';
import { UpdateComponent } from '../update/update.component';
import { JsonServerService } from '../service/json-server.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  currentUser: any
  flag: boolean = false
  @ViewChild('Updatecurrent') Updatecurrent!: ElementRef
  constructor(private serv: JsonServerService, private actv: ActivatedRoute, private dailog: MatDialog) { }

  nameProfile: any
  ngOnInit() {
    this.actv.params.subscribe((user) => {
      this.nameProfile = user['id']
      console.log(this.nameProfile)
    })
    // this.getUser();
    this.getUserdata()
  }

  
  userdata: any
  newUserData: any = {}

  imgch: any = 0
  iduser: any = []

  getUser() {
    this.serv.getDetails().pipe(
      map((data: any) => {
        // Filter the userdata array based on the nameProfile
        return data.find((user: any) => user.id === this.nameProfile);
      })
    ).subscribe(
      (user) => {
        // If user is found, update newUserData, iduser, and imgurl
        if (user) {
          this.newUserData = user;
          this.iduser.push(user.id);
          this.imgurl = user.image;
          console.log(this.newUserData, this.iduser);
        } else {
          console.log('User not found.');
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  getUserdata() {
    debugger
    this.serv.getDetails().subscribe((res: any) => {
      const data = res

      data.forEach((user: any) => {
        if (user.id == this.nameProfile) {
          this.currentUser = user
        }
      })
    }, (error: any) => {
      console.error('Error fetching user details:', error);
    })
  }


  imgurl: any;
  PreviousPhoto: any

  onImageChange(e: any) {
    debugger
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (imgres: any) => {
        console.log(imgres.target.result);
        this.imgurl = imgres.target.result;

        if (this.imgurl) {
          this.flag = true
          // this.currentUser.file=''
          this.PreviousPhoto = this.currentUser.image
          this.currentUser.image = this.imgurl

        } else {
          this.flag = false
        }

        // Update file1 property of newUserData with the image URL
        this.newUserData.image = this.imgurl;
      };
    }
  }

  updatePhotos() {
    debugger
    this.flag = false
    alert('Your Profile Picture has been Updated Successfully')
  }

  cancel() {
    this.flag = false
    this.currentUser.image=this.PreviousPhoto
  }

  updateUserData() {
    debugger
    if (this.userdata) {
      for (let d of this.userdata) {
        if (d.name === this.nameProfile) {
          this.newUserData = { ...d }; // Create a new object to avoid mutation
          this.iduser.push(d.id);
          console.log(this.newUserData, this.iduser);
          this.imgurl = this.newUserData.image;
        }
      }
    }
  }


  // updateUserWithImage() {
  //   if (this.newUserData) {
  //     this.serv.updateUser(this.newUserData, this.newUserData.id).subscribe(
  //       () => {
  //         console.log('User data updated successfully');
  //       },
  //       (error) => {
  //         console.error('Error updating user data:', error);
  //       }
  //     );
  //   } else {
  //     console.error('User data is null or undefined');
  //   }
  // }

  openDialog() {
    debugger
    this.dailog.open(UpdateComponent, {
      width: "36%",
      data: this.nameProfile
    });
  }

  edit(val: any) {
    console.log(val)

  }

}