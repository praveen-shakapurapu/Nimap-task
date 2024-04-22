import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonServerService {
  constructor( private http:HttpClient){}

  apiUrl: any = "http://localhost:3000/profiles"
  getDetails(){
    return this.http.get(this.apiUrl)
  } 

  addUser(formData:any){
    return this.http.post(this.apiUrl,formData)
  } 
  
  updateUser(formData:any,id:any){
    return this.http.put(`${this.apiUrl}/${id}`,formData)
  }

  // searchproducts(id:any){
  //   return this.http.get(`${this.apiUrl}/${id}`)
  // }

}
