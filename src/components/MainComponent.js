import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import {Route , useParams} from 'react-router-dom';
import { Routes} from "react-router-dom";
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
 
  // HomePage(){
  //   return(
  //    <Home/>
  //   );
  // }
  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId});
  // }

   
  render() {
    const HomePage = () => {
      return(
        <Home 
        dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}
    />
      );
    }
    const DishWithId = () => {
      const { dishId } = useParams();
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(dishId,10))} />
      );
    };
    
    return (
      <div>
        {/* <Header/> */}
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Routes>
          <Route path="/" element={<Header />}>
             <Route index path='home' element={<HomePage/>}/>
             <Route exact path='menu' element={<Menu dishes={this.state.dishes} />} />
             <Route path='/menu/:dishId' element={<DishWithId/>} />
             <Route  path='aboutus'  element={<AboutUs leaders={this.state.leaders}/>}/>
             <Route  path='contactus'  element={<ContactUs/>}/>
             {/* <Redirect to="/home" /> */}
             <Route path="*" to='home'/>
          </Route>
        </Routes>
        <Footer/>
      </div>
    );
  }
}

export default Main;