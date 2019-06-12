import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { License } from '@core/models';

@Injectable()
export class LicenseService {

  constructor(private firestore: AngularFirestore) { }

  getLicenses() {
    return this.firestore.collection('licenses').snapshotChanges();
  }

  getLicense(licenseId: string) {
    return this.firestore.collection('licenses').doc(licenseId).snapshotChanges();
  }

  createLicense(license: License) {
    return this.firestore.collection('licenses').add(license);
  }

  updateLicense(license: License) {
    const licenseId = license.id;
    delete license.id;
    this.firestore.doc('licenses/' + licenseId).update(license);
  }

  deleteLicense(licenseId: string) {
    this.firestore.doc('licenses/' + licenseId).delete();
  }

}
