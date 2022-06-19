	

<template>
  <div>
    <center><h3>Magic searching with Algolia</h3></center>
    <ais-instant-search :search-client="searchClient" index-name="candidates" :middlewares="middlewares">
      <ais-search-box id="searchInput" v-model="search"/>   
      <ais-hits>
        <template v-slot="{ items, sendEvent }">
          <div 
            :id="item.objectID"
            class="searchResults" 
            @click="runClickOnResult(sendEvent, item)" 
            v-for="item in items" 
            :key="item.objectID"
          >
            <span id="header">
              <h5>{{ item.title }}</h5>
              <img :id="`img-${item.objectID}`" src="https://i.imgur.com/5Je2dmA.png" alt="thumbs up"/>
            </span>  
            <br/>
            <p>{{ item.resume }}</p>
          </div>
        </template>
      </ais-hits>
    </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import 'instantsearch.css/themes/satellite-min.css';
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';
import aa from 'search-insights';

const insightsMiddleware = createInsightsMiddleware({
  insightsClient: aa,
})

export default {
  data() {
    return {
      searchVisible: false,
      search: '',
      searchClient: algoliasearch(
          process.env.VUE_APP_ALGOLIA_APPLICATION_ID,
          process.env.VUE_APP_ALGOLIA_SEARCH_API_KEY
        ),
      instantSearch: null,
      middlewares: [insightsMiddleware]
    };
  },
  methods: {
    runClickOnResult(method, item) {
      method('click', item, 'Item Starred');
      document.getElementById(`img-${item.objectID}`).src = "https://i.imgur.com/j635pgy.png";
    }
  },
};
</script>

<style>

input {
  margin:2em;
}

html {
  background-color:#edeff5;
  margin:4em;
}

h3 {
  color: #3c4fe0;
  letter-spacing:.04ch;
}

h5 {
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing:.03ch;
  color:#5a5e9a;
  line-height: 0.4rem;
  margin:2.5rem;
}

span#header {
  display:flex;
  justify-content:space-between;
}

span#header img {
  height:25px;
  width:25px;
}

div.searchResults {
  background-color:white;
  padding:3rem;
  margin:2rem;
}

.ais-SearchBox-input {
  /* background-color: white; */
  height:45px;
  width:100%;
  margin:0px;
}

.ais-InstantSearch {
  width:50%;
  margin:auto;
}

.ais-Hits {
  margin-top:1rem;
}

.ais-Hits-item p{
  font-size: 1.5rem;
  margin:0rem 2.5rem 1rem 2.5rem;
  line-height: 2.25rem;
  
}

.ais-SearchBox-form {
  background-color: inherit;
  margin-bottom:2rem;
  height:8rem;
}

</style>
