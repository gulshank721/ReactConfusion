import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay ,CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button,Modal,ModalBody,ModalHeader, Label, Row, Col} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import  {postComments}  from '../redux/comments';
import { postFavorites } from "../redux/favorites";
import {fetchDishes} from '../redux/dishes';
import { Loading } from './LoadingComponent';
import { useEffect } from "react";
import { useSelector, useDispatch, connect } from 'react-redux'
import { baseUrl } from "../shared/baseUrl";
// import { connect } from 'react-redux';




// import CommentForm from "./CommentFormComponent";
//// validators
const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
//  commentForm Component start here

// const mapDispatchToProps = dispatch => ({
  
//     addComment: (dishId, rating, author, comment) => dispatch(addComments(dishId, rating, author, comment))
  
//   });
//   const mapDispatchToProps = { addComments };
//   const mapStateToProps = (state) => ({
//     // comment: state.counter.value
//     comment:state.comments.comments
//   });
class CommentForm extends Component {
    

    constructor(props) {
        super(props);


        this.state = {
            isCommentFormModalOpen: false
        };

        this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
        this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);


    }

    handleCommentFormSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        // alert("Current State is: " + JSON.stringify(values));
        // const {addComment} = this.props.addComments;
        this.props.postComment(this.props.dishId,values.rating, values.author, values.comment);

    }

    toggleCommentFormModal() {
        this.setState({
            isCommentFormModalOpen: !this.state.isCommentFormModalOpen
        });
    }


    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleCommentFormModal}>
                    <span className="fa fa-comments fa-lg"></span> Submit Comment
                </Button>


                {/* commentform  Modal */}
                <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal} >
                    <ModalHeader toggle={this.toggleCommentFormModal}> Submit Comment </ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>

                            {/* rating */}
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12} >Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating"
                                        className="form-control"
                                        name="rating"
                                        id="rating"
                                        validators={{
                                            required
                                        }}
                                    >
                                        <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>


                            {/* author */}
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>




                            {/* comment */}
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>

                            </Row>

                            {/* submit button */}
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>

                    </ModalBody>
                </Modal>


            </React.Fragment>
        );
    }
}
// export default connect(mapStateToProps,mapDispatchToProps)(CommentForm);

// commmentFormComponents Ends here

    function RenderDish({dish, favorite, postFavorite}) {
       
        const dispatch = useDispatch();
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                        <CardImgOverlay>
                                <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : dispatch(postFavorite(dish._id))}>
                                    {favorite ?
                                        <span className="fa fa-heart"></span>
                                        : 
                                        <span className="fa fa-heart-o"></span>
                                    }
                                </Button>
                            </CardImgOverlay>
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({comments ,dishId}){
        // const comments = useSelector((state) => state.comments.comments)
        const dispatch = useDispatch();
        const postComment=(dishId,rating,author,comment)=>{
            console.log('postcomment data',dishId,rating,author,comment);
            const newComment={
               
                dishId: dishId,
                rating: parseInt(rating),
                author: author,
                comment: comment,
                date :new Date().toISOString()
            }
            dispatch(postComments(newComment))
            };
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p className="cmtauthor">{comment.comment}</p>
                    <p >-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
                
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                 
                 <CommentForm dishId={dishId} postComment={postComment}> </CommentForm>
            </div>
        )
    }


    function DishDetail({dish,isLoading,errMess, comments,favorite,postFavorite}){
        console.log('In DishDatail', favorite);
        if (isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{errMess}</h4>
                    </div>
                </div>
            );
        }

       
       else if (dish == null) {
            return (<div></div>);
        }
           
        // const dishItem = this.renderDish(dish);
        // const dishComment = this.renderComments(dish.comments);

        else {
           return (
            <div className="container"> 
             <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
            </div>
                <div className='row'>
                <RenderDish dish ={dish} favorite={favorite} postFavorite={postFavorite}/>
                <RenderComments comments={comments} dishId={dish.id}/>
                
                 </div>
            </div>
           )
        }

    }


export default DishDetail;
// export default {DishDetail,Connected};
// export default DishDetail
// export default connect(null ,{ addComments })(CommentForm);