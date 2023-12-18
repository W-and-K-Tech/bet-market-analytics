Bet Market Analytics Dashboard

## Objective

Develop a JavaScript-based data visualization dashboard that provides insightful analytics on sports betting transactions. The dashboard should offer time-series analysis and dimensional analysis capabilities. You will use JavaScript for front-end development and SQL for data querying.

## Key Features

- Time-Series Analysis: Display bet handle trends over time for selected markets.
- Dimensional Analysis: Analyze bet handle performance based on various dimensions like stat_type, sport, etc...
  Data Interactivity: Implement interactive elements such as dropdowns for market types, date range pickers for time-series analysis, and filters for dimensional analysis.
- SQL Integration: Use SQL queries to fetch data dynamically based on user interactions. Integrate these queries within the JavaScript codebase.
- Responsive Design: Ensure the dashboard is responsive and accessible on various devices.

## Technical Requirements

- Frontend: JavaScript with any preferred library/framework (e.g., React, Vue.js, D3.js for visualizations).
- Backend (Optional for Querying): Node.js/Express server to handle SQL queries and serve data to the front end.
  Database: Any SQL database (e.g., PostgreSQL, MySQL). Create a schema with bet transaction data and write SQL queries to fetch the data.
  Visualization: Use D3.js, Chart.js, or any other JavaScript library for data visualization.

## Sample Data

- You will be provided with a sample dataset representing bet transaction data from a single NBA game in the attached bet_data_fe_assessment.json.zip file.

## Development Plan

- Convert JSON Data into SQL query statmements.

  1. Creating SQL schema based on provided data format

  ```
  CREATE TABLE bet_transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      component_cnt_bet VARCHAR(60),
      selection VARCHAR(60),
      line VARCHAR(60),
      is_alternate VARCHAR(60),

      (including the remaining fields)
  ...
  ```

  for simplicity, data types are all kept VARCHAR(60). No further database normalization.

  2. Creating Node JS script `./convertJsonToSQLQueries.js`

  `Output.sql`

  ```
  INSERT INTO bet_transactions (`component_cnt_bet`, `selection`, `line`, `is_alternate`, `is_inplay`, `is_active`, `is_cashout`, `currency`, `book_risk_component`, `book_profit_gross_component`, `client_id`, `country`, `state`, `accepted_datetime_utc`, `component_price`, `component_prob`, `component_num_bet`, `bet_type_id`, `bet_type`, `book_risk`, `parlay_type_id`, `book_profit_gross`, `parlay_type`, `bet_price`, `bet_prob`, `country_id`, `state_id`, `currency_id`, `sport_id`, `sport`, `season`, `date`, `datetime_utc`, `event_id`, `event_status_id`, `event_type_id`, `stat_type_id`, `stat_type`, `product_id`, `product`, `team_id`, `opp_id`, `team_abbr`, `opp_abbr`, `home`, `player_id`, `player_name`, `pos_id`, `pos_abbr`, `game_played`, `game_started`, `actual`, `accepted_min_before_start`, `settled_date`, `market_duration_id`, `market_duration_value`, `market_duration_type`, `bet_id_swish`, `component_id_swish`, `line_at_bet`, `prob_norm_at_bet`, `proj_at_bet`, `market_suspended_id`, `market_suspended_description`, `gamestate_id`, `gamestate`, `score`, `opp_score`, `period`, `usage_at_bet`, `actual_at_bet`, `is_in_game`, `event_time_id`, `event_time_remaining`, `usage_id`, `orig_proj_at_bet`, `line_diff_at_bet`, `prob_diff_at_bet`, `received_date`, `client_name`) VALUES (7, 'over', 5.5, 0, 0, NULL, NULL, 'usd', 0.523, 0, 25, 'canada', NULL, '2023-11-04T20:20:11.000Z', 110.00000000000001, 0.47619047619047616, 4, 2, 'multi', 3.661, NULL, 0, NULL, 56781.44000000001, 0.0017580426937152081, 37, NULL, 1, 1, 'nba', 2023, '2023-11-04', '2023-11-05T04:00:00.000Z', 2591402, 4, 1, 102, 'assists', 1, 'player_props', 16, 26, 'MIN', 'UTA', 1, 329468, 'Mike Conley', 1, 'PG', 1, 1, 6, 459.81666666666666, '2023-11-05', 1, 'rog', 'rog', '808d9593ad802ca6fe497f9aec159a0fa7e83cb52899d372639ab09d', '64bb5fb982e00f3b5086bd4a3e6ec0142a1bd9870f09041e6948ca94', '5.5', '0.4225', '5.2032', '1.0', 'player_market_not_suspended', 1, 'Pre Game', 0, 0, 1, 0, 0, 0, 1, 2880, 1, 5.2032, 0, 0.053690474, '2023-11-08', 'client_25');
  ...

  ```

  3 . Running the script in MySQL database

  ```
  mysql -h [DATABASE_NAME] -P 25060 -u [DATABASE_USER_NAME] -p swish-analytics
  ```

  4. Creating backend service with routes (with NodeJS Express, under `backend` folder) to query against the MySQL database.

  - For simplicity, query parameters are passed to SQL statements directly. This will have potential SQL injection risk. To improve, we can

    1. Limit database user priviliege to readonly.
    2. Add SQL query sanitization in backend code.
    3. Set more restricted CORS rule to allow trusted server origin only. (Currently it is \* for demo)

    Also the query data is cached for better performance. There are more optimization that can be done with saving query result with additional table in MySQL.

  5. Creating Frontend UI (Using Vue 3, Vite, Pinia, ChartJS, and PrimeVue).
     1. responsive design
     2. Updating UI accordingly with user interaction

## Development Time

5 days. Additional Development Time can be applied to optimize the speed up the UI and data response time.
