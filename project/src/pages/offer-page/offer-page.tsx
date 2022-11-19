import { Header, CommentForm, CardList, ReviewList, Rating, Map } from '../../components';
import { useParams } from 'react-router-dom';
import { City, Offer, Point } from '../../types/offer';
import { Reviews} from '../../types/review';
import { reviews } from '../../mocks/reviews';
import { NotFoundPage } from '../not-found-page';
import { useState } from 'react';

type OfferPageProps = {
  city: City;
  offers: Offer[];
  reviews: Reviews;
}

function OfferPage(props: OfferPageProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const params = useParams();
  const offer = props.offers.find((offerItem) => offerItem.id.toString() === params.id);
  // const offers = useAppSelector((state) => state.offers);
  const points: Point[] = props.offers.map((offerItem) => ({
    id: offerItem.id, ...offerItem.city.location
  }));

  if (!offer) {
    return (<NotFoundPage />);
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer.images.map((image) => (
                  <div className="property__image-wrapper" key={ image }>
                    <img className="property__image" src={ image } alt="Photo studio" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                offer.isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div> :
                  ''
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  { offer.title }
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <Rating rating={ offer.rating } />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{ offer.rating }</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  { offer.title }
                </li>
                <li className="property__feature property__feature--bedrooms">
                  { offer.bedrooms } Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max { offer.maxAdults } adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{ offer.price }</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    offer.goods?.map((goodItem) => (
                      <li className="property__inside-item" key={ goodItem }>
                        { goodItem }
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={ offer.host.avatarUrl } width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    { offer.host.name }
                  </span>
                  {
                    offer.host.isPro ?
                      <span className="property__user-status">
                        Pro
                      </span> : ''
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ props.reviews.length }</span></h2>
                <ReviewList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              points={ points }
              city={ props.city }
              selectedPoint={ activeCard?.id }
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CardList
                offers={ props.offers }
                setActiveCard={ setActiveCard }
                offerType={ 'nearby' }
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
