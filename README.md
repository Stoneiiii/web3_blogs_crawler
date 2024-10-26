# creat a table 
CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    time DATETIME,
    title VARCHAR(255),
    url VARCHAR(255) UNIQUE,
    articlebody TEXT
);


