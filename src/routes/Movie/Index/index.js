import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import reducer from './reducers';

import injectReducer from './../../../utils/injectReducer';

injectReducer('movie', reducer);

@connect(
  state => state.movie,
  dispatch => bindActionCreators(actions, dispatch)
)
class Movie extends React.Component {
  componentDidMount() {
    const {
      isLoaded,
      loadMovieTheaters
    } = this.props;

    // 未加载情况下，获取正在上映电影列表
    if (!isLoaded) {
      loadMovieTheaters();
    }
  }

  render() {
    const {
      subjects
    } = this.props.data;

    return (
      <div>
        <ul>
          {
            subjects && subjects.map((item, i) => {
              return (
                <li key={item.id}>{ i + 1 }. { item.title }</li>
              );
            })
          }
        </ul>

      </div>
    );
  }
}

export default Movie;
