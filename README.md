# Ivy-Homes-Assignment
API URL =>http://35.200.185.69:8000/v1/autocomplete?query=<string>
# My Observations
Version 1 has 100 rate limit per minute
Version 2 has 50 rate limit per minute
Version 3 has 80 rate limit per minute

I have seen that we can get all the names using maximum query of length two in versions 2 and 3 and in version 1 query of length 1 gives repetitive names.

In version 1 we have alphabetical characters for the query but in 2 and 3 we have alphabet as well as numeric characters

# Total Number of requests
Version 1:676
Version 2:1332
Version 3:1332

#Total Number of Results
Version 1:6720
Version 2:7873
Version 3:7156

# Approach 

1)First I go through brute force technique to get the maximum query length possible and rate limit for each versions
2)Then I run a loop for each possible character and maintain a delay of rate limit in between to avoid error
3)Then I store all the names in a set to ensure uniqueness and at last return its count.


