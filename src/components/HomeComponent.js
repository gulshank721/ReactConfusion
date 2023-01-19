import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
    import { Loading } from './LoadingComponent';
    import { baseUrl } from '../shared/baseUrl';
    import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDishes } from '../redux/dishes';
import { fetchComments } from '../redux/comments';
import { fetchPromotions } from '../redux/promotions';
import { useSelector, useDispatch } from 'react-redux'


function RenderCard({item, isLoading, errMess}) {
    const dishes = useSelector((state) => state.dishes)

    if (dishes.isLoading) {
        return(
                <Loading />
        );
    }
    else if (dishes.errMess) {
        return(
                <h4>{errMess}</h4>
        );
    }
    else
    return(
        console.log(typeof(item)),
        console.log('hi HomeComponent',item,isLoading,errMess),
        <Card>

            <CardImg src={baseUrl+item.image} alt={item.name} />
            <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );

}

function Home({dish,dishesLoading,dishesErrMess,promotion,promotionsLoading,promotionsErrMess,leader,leadersLoading,      leadersErrMess}) {

    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    {console.log('dish sending to rendercard',dish,dishesLoading,dishesErrMess,'p',promotion,promotionsLoading,promotionsErrMess,leader,leadersLoading,      leadersErrMess)}
                    
                    <RenderCard item={dish} isLoading={dishesLoading} errMess={dishesErrMess}  />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={promotion} isLoading={promotionsLoading} errMess={promotionsErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={leader} isLoading={leadersLoading} errMess={leadersErrMess}/>
                </div>
            </div>
        </div>
    );
}

export default Home;