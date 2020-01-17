import { AppPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';
import { async } from 'q';


describe('Pubg-frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  
  it('should display title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('PubGUI');
  });


  it('should be redirected to /login route on opening the application', () => {
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should be redirected to /register route', () => {
    browser.element(by.css('.register-button')).click();
    expect(browser.getCurrentUrl()).toContain('/register');
  });

  it('should be able to register user', () => {
    browser.driver.sleep(1000);
    browser.element(by.id('firstName')).sendKeys('Super User');
    browser.element(by.id('lastName')).sendKeys('Super lastUser');
    browser.element(by.id('userId')).sendKeys('Super User12');
    browser.element(by.id('password')).sendKeys('Super Userpass');
    browser.element(by.id('register-user')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  
  it('should be able to login user and navigate to tournaments', () => {
    browser.element(by.id('userId')).sendKeys('Super User12');
    browser.element(by.id('password')).sendKeys('Super Userpass');

    browser.element(by.css('.login-user')).click();

    expect(browser.getCurrentUrl()).toContain('/pubg/tournaments');

  });


  it('should be able to  navigate to tournament-details', () => {
   

    browser.element(by.css('.addButton')).click();

    expect(browser.getCurrentUrl()).toContain('/matches/');

  });

  it('should be able to  navigate to match-details', () => {
   

    browser.element(by.css('.addButton')).click();

    expect(browser.getCurrentUrl()).toContain('/match/');

  });


  it('should be able to  add match to favourites', () => {
   

    browser.driver.sleep(1000);
    browser.element(by.css('.addButton')).click();

  });
  
});