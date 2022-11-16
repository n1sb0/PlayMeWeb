IF NOT EXISTS(SELECT * FROM sys.databases
WHERE name = '$(database)')
BEGIN
   CREATE DATABASE $(database)
END