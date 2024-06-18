# Use the official PHP image with Apache
FROM php:8.1-apache

# Copy the application files to the Apache document root
COPY ./app /var/www/html/

# Set the working directory
WORKDIR /var/www/html/

# Enable necessary Apache modules
RUN a2enmod rewrite

# Install dependencies
RUN apt-get update && apt-get install -y \
    libjpeg-dev libpng-dev\
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install gd    

# Grant permissions to the image directory
RUN chown -R www-data:www-data /var/www/html/images

# Expose port 80
EXPOSE 80

# Start Apache service
CMD ["apache2-foreground"]
