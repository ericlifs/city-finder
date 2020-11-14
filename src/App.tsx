import { CityInfo } from 'interfaces';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { CitiesStore, PreferencesStore } from 'stores';
import { CitySuggestion, Dropdown, PreferredCities, PreferredCityItem } from 'ui';
import 'styles/app.scss';

function App() {
  const citiesStore = useContext(CitiesStore);
  const preferencesStore = useContext(PreferencesStore);

  useEffect(() => {
    citiesStore.getAllCities();
    preferencesStore.getPreferredCities();
  }, []);

  const onDropdownInputChange = async (term: string): Promise<void> => {
    citiesStore.getCitiesByFilter(term);
  };

  const onDropdownEndReached = async (): Promise<void> => {
    citiesStore.getMoreCities();
  };

  return (
    <div className="App">
      <section className="leftbar-section">
        <PreferredCities
          heading="Your preferred cities"
          preferredCities={preferencesStore.activePreferredCities}
          renderItem={(item: CityInfo | Error) => <PreferredCityItem item={item} />}
        />
      </section>
      <section className="main-section">
        <Dropdown
          placeholder="Type to filter by city name or country"
          onInputChange={onDropdownInputChange}
          endReached={!citiesStore.hasMoreCitiesToFetch}
          error={citiesStore.error}
          suggestions={citiesStore.currentCitiesList}
          isFetching={citiesStore.isFetching}
          renderItem={(item: CityInfo) => <CitySuggestion key={item.geonameid} city={item} />}
          onEndReached={onDropdownEndReached}
        />
      </section>
    </div>
  );
}

export default observer(App);
