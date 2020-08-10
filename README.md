## Movie Portal
The applocation shows movies data on homepage. 

## Features
    Movies should be accessible by anyone, without auth
    Admins have to login to modify db

## User Features (does not require Auth)
    View list of all movies (Listing page)
    View list sorted by popularity/Director Name/Movie Names (Listing page with sorting)
    Filter list as per Genre ie View all movies matching Genre 1 and Genre 2 (Probably show chips for all genres on top and user can select multiple to filter)
    Search movies - User will enter query and hit Search button. Any movies that has matching movie name or director name to the user query, will be shown in results.

## Admin Features (uses APIs with auth)
    Add Movies (with all data mandatory)
    Delete Movies
    Update meta-data of movies (Name cannot be modified, rest of the fields can be modified)
    While updating Movie meta, use can select genres from existing list or even add a new genre (that will be added to genre list in db)
    Optional features
    Maintain records of admin name who created/modified movie records.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


