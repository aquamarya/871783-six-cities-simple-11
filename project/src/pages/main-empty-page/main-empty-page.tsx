import {CityList, Header} from '../../components';
import { Helmet } from 'react-helmet-async';
import { changeCityAction } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';

function MainEmptyPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city);
  const handleCitySelect = (city: string) => dispatch(changeCityAction(city));

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 городов. Нет доступных опций</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList
              selectedCity={ selectedCity }
              onCityClick={ handleCitySelect }
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainEmptyPage;
