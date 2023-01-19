import React from 'react'; 

import DishDetail from './DishdetailComponent';
import { Card, CardImg, CardImgOverlay,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';


  function RenderMenuItem ({dish, onClick}) {
    console.log('RenderMenuItem=',dish,dish._id,parseInt(dish._id))
      return (
        
          <Card>
              <Link to={`/menu/${dish._id}`} >
                  <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
              </Link>
          </Card>
      );
  }



   
    const Menu=()=>{
        const dishes = useSelector((state)=>state.dishes.dishes)
      const menu = dishes.map((dish) => {
        if (dishes.isLoading) {
          return(
              <div className="container">
                  <div className="row">            
                      <Loading />
                  </div>
              </div>
          );
      }
      else if (dishes.errMess) {
          return(
              <div className="container">
                  <div className="row"> 
                      <div className="col-12">
                          <h4>{dishes.errMess}</h4>
                      </div>
                  </div>
              </div>
          );
      }
      else
        return (
            <div  className="col-12 col-md-5 m-1">
             <RenderMenuItem dish={dish}></RenderMenuItem> 
           {/* onClick={props.onClick}/>  */}
          </div>
        );
    });

    return (
      <div className="container">
           <div className="row">
                      <Breadcrumb>
                          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                          <BreadcrumbItem active>Menu</BreadcrumbItem>
                      </Breadcrumb>
                      <div className="col-12">
                          <h3>Menu</h3>
                          <hr />
                      </div>                
            </div>
        <div className="row">
          
              {menu}
         
        </div>
           
      </div>
    );
    }
        
    


export default Menu;