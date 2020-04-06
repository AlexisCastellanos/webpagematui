import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import MenuItem from "../../components/menu-item/menu-item.component";

import { createStructuredSelector } from "reselect";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import "./directory.styles.scss";

// class Directory extends React.Component {
//   constructor() {
//     super();
//     this.state = {

//     };
//   }

//   render() {
//     return (
//       <div className="directory-menu">
//         {this.state.sections.map(({ id, ...otherSectionProps }) => (
//           <MenuItem key={id} {...otherSectionProps} />
//           // <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
//         ))}
//       </div>
//     );
//   }
// }

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
      // <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
