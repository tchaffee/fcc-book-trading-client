Feature: See a list of books
  As a book lover who wants to trade books
  I can see a list of all books from other book lovers

  Scenario: Home page has login link
    Given I am on the book trading website home page
    Then I should see "Login"

  Scenario: Get a list of all books
    Given I am on the book trading website home page
    And I login with user "test@foobar.com" and password "foobar"
    When I click on "All Books"
    Then I should see a book with title "A sample book"

  Scenario: Get a list of my books
    Given I am on the book trading website home page
    And I login with user "test@foobar.com" and password "foobar"
    When I click on "My Books"
    Then I should see a book with title "My book"

  @now
  Scenario: Add a book
    Given I am on the book trading website home page
    And I login with user "test@foobar.com" and password "foobar"
    When I click on "My Books"
    And I type "Animal Farm" in the "add-books-input" input
    And I click on "Add"
    Then I should see a book with title "Animal Farm"

#  Scenario: See my trade requests
#    Given I am on the book trading website home page
#    And I login with user "test@foobar.com" and password "foobar"
#    When I click on "All Books"
#    And I click on "Your trade requests"
#    Then I should see a list of my trade requests

