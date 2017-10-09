import React from 'react';

class CatDetail extends React.Component {
  render() {
    return (
      <div>
        CatDetail, id: { this.props.match.params.id }
      </div>
    );
  }
}

export default CatDetail;
