Feature: See a list of books
  As a book lover who wants to trade books
  I can see a list of all books from other book lovers

  Scenario: Home page has login link
    Given I am on the book trading website home page
    Then I should see "Login"

  Scenario: Login
    Given I am on the book trading website home page
    When I click on "Login"
    Then I should see "Login"

  @now
  Scenario: Get a list of all books
    Given I am on the book trading website home page
    And I login with user "test@foobar.com" and password "foobar"
    When I click on "All Books"
    Then I should see a book with title "A sample book"
