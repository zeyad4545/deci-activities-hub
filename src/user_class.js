class User {
    constructor(data) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.maidenName = data.maidenName;
      this.age = data.age;
      this.gender = data.gender;
      this.email = data.email;
      this.phone = data.phone;
      this.username = data.username;
      this.password = data.password;
      this.birthDate = data.birthDate;
      this.image = data.image;
      this.bloodGroup = data.bloodGroup;
      this.height = data.height;
      this.weight = data.weight;
      this.eyeColor = data.eyeColor;
      this.hair = data.hair;
      this.ip = data.ip;
      this.address = data.address;
      this.macAddress = data.macAddress;
      this.university = data.university;
      this.bank = data.bank;
      this.company = data.company;
      this.ein = data.ein;
      this.ssn = data.ssn;
      this.userAgent = data.userAgent;
      this.crypto = data.crypto;
      this.role = data.role;
    }
  
    static fromJSON(json) {
      return new User(json);
    }
  }  