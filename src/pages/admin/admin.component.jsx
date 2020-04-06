import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUser, selectCurrentUser } from "../../redux/user/user.selector";
import {
  firestore,
  convertCollectionsSnapShotToMap,
  convertCollectionsSnapShotToMap2
} from "../../firebase/firebase.utils";

import "./admin.styles.scss";

class Admin extends React.Component {
  unsubscribeFromSnapshot = null;
  cities=[];
  constructor(props) {
    super(props);

    this.state = {
      isdata: false,
      order: null,
      collectionOrder: null,
      show: false,
      next: false,
      last: {},
      pendings: [],
      limit:3,
      arrayPend:null
    };

    this.getFirstX = this.getFirstX.bind(this);
    this.getNextX = this.getNextX.bind(this);
    this.getPrevX = this.getPrevX.bind(this);
  }

  // state = {
  //   isdata: false,
  //   order: null,
  //   collectionOrder: null,
  //   show: false,
  //   next: false,
  //   last: {},
  //   cities:[],
  // };

  getOrders = () => {
    firestore
      .collection("pendings")
      .doc("Sat Apr 04 2020 11:58:29 GMT-0600 (Central Standard Time)")
      .get()
      .then(doc => {
        console.log("zxzxzx");
        console.log(doc.data());
        console.log("zxzx");
      });

    const collectionRef = firestore
      .collection("pendings")
      .orderBy("date", "asc");

    collectionRef.onSnapshot(async snapshot => {
      console.log("collectionRef");
      console.log(snapshot);
      console.log("collectionRefdocs");
      console.log(snapshot.docs);
      console.log("collectionRef.legth");
      console.log(snapshot.docs.length);

      const collectionOrder = convertCollectionsSnapShotToMap(
        snapshot,
        "DvzGCKufptO4JPtaNw64SI6f8Bd2"
      );

      var order = collectionOrder.reduce(function(acc, cur, i) {
        acc[i] = cur;
        return acc;
      }, {});

      let ddata = { ...[collectionOrder] };
      console.log("collectionOrder[0]");
      console.log(collectionOrder[0]);
      console.log("order[0]");
      console.log(order[0]);

      const test = [...ddata[0]];
      console.log("test.map(item => console.log(item.id))");
      test.map(item => console.log(item.id));
      this.setState({
        collectionOrder,
        order: test,
        show: true
      });
    });
    console.log("this.state");
    console.log(this.state);
  };

  getStatus = () => {
    console.log(this.state);
    console.log(this.state.last);
  };

  async getFirstX() {
    console.log("this.state.order.length");
    console.log(this.state.order);
    // var cities = [];
    var lastVisibleCitySnapShot = {};
    var first = firestore.collection("pendings").orderBy("date", "asc");

    const query = await first.limit(this.state.limit);
    query.get().then(snap => {
      snap.forEach(doc => {
        const { personal, items, currentUserID, total } = doc.data();
        console.log("doc.data()");
        console.log(doc.data());
        var itm={
          currentUserID: currentUserID,
          id: doc.id,
          personal,
          items,
          total
        };

        this.cities.push(itm);
        
        this.setState(prevState => ({
          arrayPend: {...prevState.arrayPend, itm}
        }))

        // cities.push(doc.data());
        console.log({
          currentUserID: currentUserID,
          id: doc.id,
          personal,
          items,
          total
        });
        console.log(doc.data());
        console.log(doc.id);
        console.log("this.cities1");
        console.log(this.cities);
      });
      lastVisibleCitySnapShot = snap.docs[snap.docs.length - 1];
      console.log(lastVisibleCitySnapShot);
      this.setState({
        last: lastVisibleCitySnapShot,
        order: this.cities,
        show: true,
        // arrayPend:{...this.state.arrayPend, cities}
      });
      // var joined = {...this.state.arrayPend,...cities}
      // this.setState({ arrayPend: joined })
    });
  }


  async getNextX() {
    console.log('this.state.order.length');
    console.log(this.state.order.length);
    if(this.state.order.length!=3){
      return
    }
    // var cities = [];
    var lastVisibleCitySnapShot = {};

    const query = await firestore
      .collection("pendings")
      .orderBy("date", "asc")
      .startAfter(this.state.last)
      .limit(this.state.limit);

    query.get().then(snap => {
      snap.forEach(doc => {
        const { personal, items, currentUserID, total } = doc.data();
        console.log("doc.data()");
        console.log(doc.data());
        var itm={
          currentUserID: currentUserID,
          id: doc.id,
          personal,
          items,
          total
        };

        this.cities.push(itm);
        
        this.setState(prevState => ({
          arrayPend: {...prevState.arrayPend, itm}
        }))

        // cities.push(doc.data());
        console.log({
          currentUserID: currentUserID,
          id: doc.id,
          personal,
          items,
          total
        });
        console.log(doc.data());
        console.log(this.cities);
      });
      lastVisibleCitySnapShot = snap.docs[snap.docs.length - 1];
      console.log(lastVisibleCitySnapShot);
      this.setState({
        last: lastVisibleCitySnapShot,
        order: this.cities,
        show: true,
        // arrayPend:{...this.state.arrayPend, cities}
      });
    });
  }

  async getPrevX() {
    var cities = [];
    var lastVisibleCitySnapShot = {};

    const query = await firestore
      .collection("pendings")
      .orderBy("date", "asc")
      .endBefore(this.state.last)
      .limit(this.state.limit);

    query.get().then(snap => {
      snap.forEach(doc => {
        const { personal, items, currentUserID, total } = doc.data();
        console.log("doc.data()");
        console.log(doc.data());
        cities.push({
          currentUserID: currentUserID,
          id: doc.id,
          personal,
          items,
          total
        });

        // cities.push(doc.data());
        console.log({
          currentUserID: currentUserID,
          id: doc.id,
          personal,
          items,
          total
        });
        console.log(doc.data());
        console.log(cities);
      });
      lastVisibleCitySnapShot = snap.docs[snap.docs.length - 1];
      console.log(lastVisibleCitySnapShot);
      this.setState({
        last: lastVisibleCitySnapShot,
        order: cities,
        show: true,
        
      });
    });
  }

  render() {
    let orders = null;

    if (this.props.currentUser) {
      console.log("I'm a user");
      if (this.props.currentUser.admin) {
        console.log("I'm an Admin");
        if (this.state.show == false) {
          orders = <p></p>;
        } else {
          console.log("this.state.order");
          console.log(this.state.order[0].id);
          console.log("this.state.order");

          this.state.order.map(item => console.log(item.id));
          // orders = <p>{this.state.order[0].id}</p>;
          orders = (
            <div>
              {this.state.order.map(item => (
                <React.Fragment key={item.currentUser + "" + item.id}>
                  <p
                    style={{ justifyContent: "space-evenly", display: "flex" }}
                    key={item.currentUser + "" + item.id}
                  >
                    {item.id +
                      " / " +
                      item.currentUserID +
                      " / " +
                      item.personal.address.phone1 +
                      " / " +
                      item.personal.address.phone2}

                    <p
                    // style={{ justifyContent: "space-evenly", display: "flex" }}
                    >
                      {"$" + item.total}
                    </p>
                    <button>Show Items</button>
                  </p>
                </React.Fragment>
              ))}
            </div>
          );
        }
      } else {
        orders = <p>Im NOT an admin</p>;
      }
    } else {
      console.log("I'not a user");
    }

    return (
      <div className=".admin-page">
        <button onClick={this.getOrders}>Show Pending Orders</button>
        <button onClick={this.getStatus}>status</button>
        <button onClick={this.getFirstX}>First</button>
        <button onClick={this.getNextX}>Next</button>
        <button onClick={this.getPrevX}>Prev</button>
        {orders}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Admin);
