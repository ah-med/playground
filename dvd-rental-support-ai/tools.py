import psycopg2
import os
from dotenv import load_dotenv
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta

load_dotenv()

class DvdRentalTools:
    """Tool class for the DVD Rental Support AI to interact with the DVD rental database"""
    
    def __init__(self):
        """Initialize the Tool class with database connection parameters"""
        self.db_config = {
            'dbname': os.getenv('DB_NAME'),
            'user': os.getenv('DB_USER'),
            'password': os.getenv('DB_PASSWORD'),
            'host': os.getenv('DB_HOST'),
            'port': os.getenv('DB_PORT')
        }
    
    def _get_connection(self):
        """Get a database connection"""
        try:
            return psycopg2.connect(**self.db_config)
        except Exception as e:
            print(f"Database connection error: {e}")
            return None
    
    def get_movie_information(self, movie_title: str) -> Optional[Dict[str, Any]]:
        """
        Movie Information Tool: Get comprehensive details about a specific movie
        
        Args:
            movie_title (str): The title of the movie to search for
            
        Returns:
            Optional[Dict]: Movie information including title, description, year, rating, etc.
                          Returns None if movie not found or error occurs
        """
        try:
            conn = self._get_connection()
            if not conn:
                return None
                
            cur = conn.cursor()
            
            cur.execute("""
                SELECT 
                    f.film_id,
                    f.title,
                    f.description,
                    f.release_year,
                    f.rating,
                    f.length,
                    f.rental_rate,
                    f.replacement_cost,
                    f.special_features,
                    l.name as language,
                    STRING_AGG(DISTINCT c.name, ', ') as categories,
                    STRING_AGG(DISTINCT CONCAT(a.first_name, ' ', a.last_name), ', ') as actors
                FROM film f
                LEFT JOIN language l ON f.language_id = l.language_id
                LEFT JOIN film_category fc ON f.film_id = fc.film_id
                LEFT JOIN category c ON fc.category_id = c.category_id
                LEFT JOIN film_actor fa ON f.film_id = fa.film_id
                LEFT JOIN actor a ON fa.actor_id = a.actor_id
                WHERE LOWER(f.title) LIKE LOWER(%s)
                GROUP BY f.film_id, f.title, f.description, f.release_year, 
                         f.rating, f.length, f.rental_rate, f.replacement_cost, 
                         f.special_features, l.name
                ORDER BY f.title
                LIMIT 1
            """, (f'%{movie_title}%',))
            
            result = cur.fetchone()
            
            if result:
                movie_info = {
                    'film_id': result[0],
                    'title': result[1],
                    'description': result[2],
                    'release_year': result[3],
                    'rating': result[4],
                    'length': result[5],
                    'rental_rate': float(result[6]) if result[6] else None,
                    'replacement_cost': float(result[7]) if result[7] else None,
                    'special_features': result[8],
                    'language': result[9],
                    'categories': result[10].split(', ') if result[10] else [],
                    'actors': result[11].split(', ') if result[11] else []
                }
                
                movie_info['categories'] = [cat for cat in movie_info['categories'] if cat and cat.strip()]
                movie_info['actors'] = [actor for actor in movie_info['actors'] if actor and actor.strip()]
                
                cur.close()
                conn.close()
                return movie_info
            else:
                cur.close()
                conn.close()
                return None
                
        except Exception as e:
            print(f"Error in get_movie_information: {e}")
            return None
    
    def search_movies(self, 
                     title: Optional[str] = None,
                     category: Optional[str] = None,
                     rating: Optional[str] = None,
                     year_from: Optional[int] = None,
                     year_to: Optional[int] = None,
                     actor: Optional[str] = None,
                     language: Optional[str] = None,
                     min_length: Optional[int] = None,
                     max_length: Optional[int] = None,
                     limit: int = 20) -> Optional[List[Dict[str, Any]]]:
        """
        Movie Search Tool: Find movies by various criteria
        
        Args:
            title (str, optional): Partial movie title to search for
            category (str, optional): Movie category/genre
            rating (str, optional): MPAA rating (G, PG, PG-13, R, NC-17)
            year_from (int, optional): Start year for release date range
            year_to (int, optional): End year for release date range
            actor (str, optional): Actor name to search for
            language (str, optional): Movie language
            min_length (int, optional): Minimum movie length in minutes
            max_length (int, optional): Maximum movie length in minutes
            limit (int): Maximum number of results to return (default: 20)
            
        Returns:
            Optional[List[Dict]]: List of movies matching the criteria
                                 Returns None if error occurs
        """
        try:
            conn = self._get_connection()
            if not conn:
                return None
                
            cur = conn.cursor()
            
            base_query = """
                SELECT DISTINCT
                    f.film_id,
                    f.title,
                    f.description,
                    f.release_year,
                    f.rating,
                    f.length,
                    f.rental_rate,
                    l.name as language,
                    STRING_AGG(DISTINCT c.name, ', ') as categories,
                    STRING_AGG(DISTINCT CONCAT(a.first_name, ' ', a.last_name), ', ') as actors
                FROM film f
                LEFT JOIN language l ON f.language_id = l.language_id
                LEFT JOIN film_category fc ON f.film_id = fc.film_id
                LEFT JOIN category c ON fc.category_id = c.category_id
                LEFT JOIN film_actor fa ON f.film_id = fa.film_id
                LEFT JOIN actor a ON fa.actor_id = a.actor_id
            """
            
            where_conditions = []
            query_params = []
            
            if title:
                where_conditions.append("LOWER(f.title) LIKE LOWER(%s)")
                query_params.append(f'%{title}%')
            
            if category:
                where_conditions.append("LOWER(c.name) LIKE LOWER(%s)")
                query_params.append(f'%{category}%')
            
            if rating:
                where_conditions.append("f.rating = %s")
                query_params.append(rating)
            
            if year_from:
                where_conditions.append("f.release_year >= %s")
                query_params.append(year_from)
            
            if year_to:
                where_conditions.append("f.release_year <= %s")
                query_params.append(year_to)
            
            if actor:
                where_conditions.append("(LOWER(a.first_name) LIKE LOWER(%s) OR LOWER(a.last_name) LIKE LOWER(%s))")
                query_params.append(f'%{actor}%')
                query_params.append(f'%{actor}%')
            
            if language:
                where_conditions.append("LOWER(l.name) LIKE LOWER(%s)")
                query_params.append(f'%{language}%')
            
            if min_length:
                where_conditions.append("f.length >= %s")
                query_params.append(min_length)
            
            if max_length:
                where_conditions.append("f.length <= %s")
                query_params.append(max_length)
            
            if where_conditions:
                base_query += " WHERE " + " AND ".join(where_conditions)
            
            base_query += """
                GROUP BY f.film_id, f.title, f.description, f.release_year, 
                         f.rating, f.length, f.rental_rate, l.name
                ORDER BY f.title
                LIMIT %s
            """
            query_params.append(limit)
            
            cur.execute(base_query, query_params)
            results = cur.fetchall()
            
            movies = []
            for result in results:
                movie = {
                    'film_id': result[0],
                    'title': result[1],
                    'description': result[2],
                    'release_year': result[3],
                    'rating': result[4],
                    'length': result[5],
                    'rental_rate': float(result[6]) if result[6] else None,
                    'language': result[7],
                    'categories': result[8].split(', ') if result[8] else [],
                    'actors': result[9].split(', ') if result[9] else []
                }
                
                movie['categories'] = [cat for cat in movie['categories'] if cat and cat.strip()]
                movie['actors'] = [actor for actor in movie['actors'] if actor and actor.strip()]
                
                movies.append(movie)
            
            cur.close()
            conn.close()
            return movies
            
        except Exception as e:
            print(f"Error in search_movies: {e}")
            return None

    def get_customer_rental_history(self, customer_id: int) -> Optional[Dict[str, Any]]:
        """
        Customer Rental History Tool: Get a customer's rental history
        
        Args:
            customer_id (int): The ID of the customer to get the rental history for
            
        Returns:
            Optional[Dict]: Customer rental history including rental dates, movie titles, and return dates
                          Returns None if customer not found or error occurs
        """
        try:
            conn = self._get_connection()
            if not conn:
                return None
                
            cur = conn.cursor()
            
            cur.execute("""
                SELECT 
                    c.customer_id,
                    c.store_id,
                    c.first_name,
                    c.last_name,
                    c.email,
                    c.activebool,
                    c.create_date,
                    c.last_update,
                    c.active,
                    a.address,
                    a.address2,
                    a.district,
                    a.postal_code,
                    a.phone,
                    city.city,
                    country.country
                FROM customer c
                JOIN address a ON c.address_id = a.address_id
                JOIN city ON a.city_id = city.city_id
                JOIN country ON city.country_id = country.country_id
                WHERE c.customer_id = %s
            """, (customer_id,))
            
            customer_result = cur.fetchone()
            if not customer_result:
                cur.close()
                conn.close()
                return None
            
            customer_info = {
                'customer_id': customer_result[0],
                'store_id': customer_result[1],
                'first_name': customer_result[2],
                'last_name': customer_result[3],
                'email': customer_result[4],
                'active_status': customer_result[5],
                'member_since': customer_result[6],
                'last_update': customer_result[7],
                'active': customer_result[8],
                'address': customer_result[9],
                'address2': customer_result[10],
                'district': customer_result[11],
                'postal_code': customer_result[12],
                'phone': customer_result[13],
                'city': customer_result[14],
                'country': customer_result[15]
            }
            
            cur.execute("""
                SELECT 
                    r.rental_id,
                    f.title,
                    f.rental_duration,
                    r.rental_date,
                    r.inventory_id,
                    c.name as category,
                    f.rental_rate,
                    f.replacement_cost
                FROM rental r
                JOIN inventory i ON r.inventory_id = i.inventory_id
                JOIN film f ON i.film_id = f.film_id
                LEFT JOIN film_category fc ON f.film_id = fc.film_id
                LEFT JOIN category c ON fc.category_id = c.category_id
                WHERE r.customer_id = %s AND r.return_date IS NULL
                ORDER BY r.rental_date DESC
            """, (customer_id,))
            
            current_rentals = []
            for rental in cur.fetchall():
                rental_date = rental[3]
                rental_duration = rental[2]
                due_date = rental_date + timedelta(days=rental_duration)
                days_overdue = max(0, (datetime.now() - due_date).days)
                late_fees = days_overdue * 1.00  # $1 per day
                
                current_rentals.append({
                    'rental_id': rental[0],
                    'film_title': rental[1],
                    'rental_duration': rental_duration,
                    'rental_date': rental_date,
                    'due_date': due_date,
                    'days_overdue': days_overdue,
                    'late_fees': late_fees,
                    'inventory_id': rental[4],
                    'category': rental[5],
                    'rental_rate': float(rental[6]) if rental[6] else None,
                    'replacement_cost': float(rental[7]) if rental[7] else None
                })
            
            cur.execute("""
                SELECT 
                    r.rental_id,
                    f.title,
                    r.rental_date,
                    r.return_date,
                    f.rental_rate,
                    c.name as category,
                    p.amount as payment_amount
                FROM rental r
                JOIN inventory i ON r.inventory_id = i.inventory_id
                JOIN film f ON i.film_id = f.film_id
                LEFT JOIN film_category fc ON f.film_id = fc.film_id
                LEFT JOIN category c ON fc.category_id = c.category_id
                LEFT JOIN payment p ON r.rental_id = p.rental_id
                WHERE r.customer_id = %s AND r.return_date IS NOT NULL
                ORDER BY r.rental_date DESC
                LIMIT 50
            """, (customer_id,))
            
            rental_history = []
            for rental in cur.fetchall():
                rental_history.append({
                    'rental_id': rental[0],
                    'film_title': rental[1],
                    'rental_date': rental[2],
                    'return_date': rental[3],
                    'rental_cost': float(rental[4]) if rental[4] else None,
                    'category': rental[5],
                    'payment_amount': float(rental[6]) if rental[6] else None
                })
            
            cur.execute("""
                SELECT 
                    COUNT(r.rental_id) as total_rentals,
                    COALESCE(SUM(p.amount), 0) as total_spent,
                    COALESCE(AVG(p.amount), 0) as avg_payment
                FROM rental r
                LEFT JOIN payment p ON r.rental_id = p.rental_id
                WHERE r.customer_id = %s
            """, (customer_id,))
            
            financial_result = cur.fetchone()
            financial_summary = {
                'total_rentals': financial_result[0],
                'total_spent': float(financial_result[1]) if financial_result[1] else 0.0,
                'avg_payment': float(financial_result[2]) if financial_result[2] else 0.0
            }
            
            cur.execute("""
                SELECT 
                    c.name as category,
                    COUNT(*) as rental_count
                FROM rental r
                JOIN inventory i ON r.inventory_id = i.inventory_id
                JOIN film f ON i.film_id = f.film_id
                JOIN film_category fc ON f.film_id = fc.film_id
                JOIN category c ON fc.category_id = c.category_id
                WHERE r.customer_id = %s
                GROUP BY c.name
                ORDER BY rental_count DESC
                LIMIT 5
            """, (customer_id,))
            
            favorite_categories = []
            for category in cur.fetchall():
                favorite_categories.append({
                    'category': category[0],
                    'rental_count': category[1]
                })
            
            cur.execute("""
                SELECT 
                    a.first_name,
                    a.last_name,
                    COUNT(*) as rental_count
                FROM rental r
                JOIN inventory i ON r.inventory_id = i.inventory_id
                JOIN film f ON i.film_id = f.film_id
                JOIN film_actor fa ON f.film_id = fa.film_id
                JOIN actor a ON fa.actor_id = a.actor_id
                WHERE r.customer_id = %s
                GROUP BY a.actor_id, a.first_name, a.last_name
                ORDER BY rental_count DESC
                LIMIT 5
            """, (customer_id,))
            
            favorite_actors = []
            for actor in cur.fetchall():
                favorite_actors.append({
                    'actor_name': f"{actor[0]} {actor[1]}",
                    'rental_count': actor[2]
                })
            
            if customer_info['member_since']:
                member_months = (datetime.now().date() - customer_info['member_since']).days / 30.44
                rental_frequency = financial_summary['total_rentals'] / max(member_months, 1)
            else:
                rental_frequency = 0
            
            preferences = {
                'favorite_categories': favorite_categories,
                'favorite_actors': favorite_actors,
                'rental_frequency_per_month': round(rental_frequency, 2)
            }
            
            total_late_fees = sum(rental['late_fees'] for rental in current_rentals)
            financial_summary['outstanding_balance'] = total_late_fees
            financial_summary['late_fees_owed'] = total_late_fees
            
            cur.close()
            conn.close()
            
            return {
                'customer_info': customer_info,
                'current_rentals': current_rentals,
                'rental_history': rental_history,
                'financial_summary': financial_summary,
                'preferences': preferences
            }
            
        except Exception as e:
            print(f"Error in get_customer_rental_history: {e}")
            return None
    
    def find_customer_and_get_history(self, 
                                    first_name: Optional[str] = None,
                                    last_name: Optional[str] = None,
                                    email: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """
        Combined Customer Search and Rental History Tool: Find customer by name/email and get rental history
        
        Args:
            first_name (str, optional): Customer's first name (partial match)
            last_name (str, optional): Customer's last name (partial match)
            email (str, optional): Customer's email address (partial match)
            
        Returns:
            Optional[Dict]: Customer search results and rental history if single match found
                          Returns None if error occurs
        """
        try:
            conn = self._get_connection()
            if not conn:
                return None
                
            cur = conn.cursor()
            
            where_conditions = []
            query_params = []
            
            if first_name:
                where_conditions.append("LOWER(c.first_name) LIKE LOWER(%s)")
                query_params.append(f'%{first_name}%')
            
            if last_name:
                where_conditions.append("LOWER(c.last_name) LIKE LOWER(%s)")
                query_params.append(f'%{last_name}%')
            
            if email:
                where_conditions.append("LOWER(c.email) LIKE LOWER(%s)")
                query_params.append(f'%{email}%')
            
            if not where_conditions:
                cur.close()
                conn.close()
                return {
                    "error": "No search parameters provided. Please provide at least first name, last name, or email."
                }
            
            search_query = """
                SELECT 
                    c.customer_id,
                    c.first_name,
                    c.last_name,
                    c.email,
                    c.store_id,
                    c.activebool,
                    c.create_date,
                    city.city,
                    country.country
                FROM customer c
                JOIN address a ON c.address_id = a.address_id
                JOIN city ON a.city_id = city.city_id
                JOIN country ON city.country_id = country.country_id
                WHERE """ + " AND ".join(where_conditions) + """
                ORDER BY c.last_name, c.first_name
                LIMIT 20
            """
            
            cur.execute(search_query, query_params)
            search_results = cur.fetchall()
            
            if not search_results:
                cur.close()
                conn.close()
                return {
                    "search_results": [],
                    "message": "No customers found matching your search criteria.",
                    "suggestions": [
                        "Check the spelling of the name",
                        "Try searching with just the last name",
                        "Verify the email address is correct"
                    ]
                }
            
            if len(search_results) == 1:
                customer_id = search_results[0][0]
                cur.close()
                conn.close()
                
                rental_history = self.get_customer_rental_history(customer_id)
                if rental_history:
                    return {
                        "search_results": [{
                            "customer_id": search_results[0][0],
                            "first_name": search_results[0][1],
                            "last_name": search_results[0][2],
                            "email": search_results[0][3],
                            "store_id": search_results[0][4],
                            "active_status": search_results[0][5],
                            "member_since": search_results[0][6],
                            "city": search_results[0][7],
                            "country": search_results[0][8]
                        }],
                        "message": f"Found 1 customer matching your search. Here's {search_results[0][1]} {search_results[0][2]}'s rental information:",
                        "rental_history": rental_history,
                        "auto_fetched": True
                    }
                else:
                    return {
                        "search_results": [{
                            "customer_id": search_results[0][0],
                            "first_name": search_results[0][1],
                            "last_name": search_results[0][2],
                            "email": search_results[0][3],
                            "store_id": search_results[0][4],
                            "active_status": search_results[0][5],
                            "member_since": search_results[0][6],
                            "city": search_results[0][7],
                            "country": search_results[0][8]
                        }],
                        "message": f"Found 1 customer matching your search, but couldn't retrieve rental history.",
                        "auto_fetched": False
                    }
            
            search_results_formatted = []
            for result in search_results:
                search_results_formatted.append({
                    "customer_id": result[0],
                    "first_name": result[1],
                    "last_name": result[2],
                    "email": result[3],
                    "store_id": result[4],
                    "active_status": result[5],
                    "member_since": result[6],
                    "city": result[7],
                    "country": result[8]
                })
            
            cur.close()
            conn.close()
            
            return {
                "search_results": search_results_formatted,
                "message": f"Found {len(search_results)} customers matching your search. Please specify which one you're looking for:",
                "suggestions": [
                    "Provide the email address to narrow down the search",
                    "Use the customer ID to get rental history directly",
                    "Add more specific name details"
                ],
                "auto_fetched": False
            }
            
        except Exception as e:
            print(f"Error in find_customer_and_get_history: {e}")
            return None
        