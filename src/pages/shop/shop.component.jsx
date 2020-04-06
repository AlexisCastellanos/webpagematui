import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
// import SHOP_DATA from "./shop.data";

import CollectionsPreview from "../../components/collection-preview/collection-preview.component";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

import CollectionPage from '../../components/collection/collection.component';
// class ShopPage extends React.Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     collections: SHOP_DATA
//   };
// }

// render() {
//   const {collections}=this.state;
//   return (
  const ShopPage = ({ match }) => {
    console.log("match");
    console.log(match);
    return (
      <div className="shop-page">
        {/** 
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
  */}
  
        {/*    <CollectionsOverview />*/}
  
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
      
        </div>
    );
  };
  
  const mapStateToProps = createStructuredSelector({
    collections: selectCollection
  });
  export default ShopPage;
