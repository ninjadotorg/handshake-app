import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// services, constants
import { createComment } from '@/reducers/comment/action';
import { API_URL } from '@/constants';

// components
import Image from '@/components/core/presentation/Image';

// style, icons
import './CreateComment.scss';
import createImageIcon from '@/assets/images/icon/comment/image.svg';
import postCommentIcon from '@/assets/images/icon/comment/post-comment.svg';

class CreateComment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
    };
    this.createComment = ::this.createComment;
    this.handleImageChange = ::this.handleImageChange;
    this.deleteImage = ::this.deleteImage;
  }

  createComment() {
    const { file } = this.state;
    let data = {};
    const rawData = { comment: this.inputRef.value, object_type: 'test', object_id: 1 };
    if(!!file) {
      data = new FormData();
      data.append('request', JSON.stringify(rawData));
      data.append('image', this.uploadImageRef.files[0]);
    } else {
      data = rawData;
    }
    this.props.createComment({
      PATH_URL: API_URL.COMMENT.CREATE,
      METHOD: 'post',
      data,
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    if(e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  deleteImage(e) {
    e && e.preventDefault();
    this.setState({
      file: '',
      imagePreviewUrl: '',
    });
  }

  render() {
    const { imagePreviewUrl } = this.state;
    return (
      <div className="createComment">
        {
          imagePreviewUrl && (
            <div className="preview">
              <img src={imagePreviewUrl} className="img-responsive" alt="preview image" />
              <button onClick={this.deleteImage}>Delete</button>
            </div>
          )
        }
        <div className="imageUpload">
          <label className="sr-only" htmlFor="image-upload">Image Upload</label>
          <input onChange={this.handleImageChange} type="file" accept="image/*" id="image-upload" ref={element => {this.uploadImageRef = element;}} />
          <Image src={createImageIcon} alt="create image icon" />
        </div>
        <textarea type="text" placeholder="Aa" ref={(component) => { this.inputRef = component; }} />
        <Image src={postCommentIcon} alt="post comment icon" onClick={this.createComment} />
      </div>
    );
  }
}

CreateComment.propTypes = {
  createComment: PropTypes.func.isRequired,
};

const mapDispatch = ({
  createComment,
});

export default connect(null, mapDispatch)(CreateComment);
