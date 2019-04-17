export class User {
  public email: string;
  public name: string;
  // public password: string;
  public uid: string;

  constructor(obj: DataObj) {

    this.email = obj && obj.email || null;
    this.name = obj && obj.name || null;
    this.uid = obj && obj.uid || null;
  }


}

interface DataObj {
  email: string;
  name: string;
  uid: string;
}
