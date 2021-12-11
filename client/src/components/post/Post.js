import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import { useParams, Link } from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading } }) => {
  // Get query id params from App router
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost]);

  return (
    <section className="container">
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn btn-dark">
            Back to posts
          </Link>
          <PostItem post={post} showAction={false} />
          <CommentForm postId={id} />
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem key={comment._id} postId={id} comment={comment} />
            ))}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ post: state.post });
export default connect(mapStateToProps, { getPost })(Post);
