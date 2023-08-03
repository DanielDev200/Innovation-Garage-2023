import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Typography, Paper, Slider, Button, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';

function App() {
  // State for the values of the sliders
  const [hasCalculated, setHasCalculated] = useState(false);
  const [amountFinanced, setAmountFinanced] = useState(15000);
  const [term, setTerm] = useState(24);
  const [APR, setAPR] = useState(5);
  const [totalInterestPaid, setTotalInterestPaid] = useState(0);
  const [interestPaidPerMonth, setInterestPaidPerMonth] = useState(0);
  const [totalAmountFinancedAndInterest, setTotalAmountFinancedAndInterest] = useState(0);
  const [isWindowSmall, setIsWindowSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowSmall(window.innerWidth < 900);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle slider value changes
  const handleSliderChange1 = (event, newValue) => {
    setAmountFinanced(newValue);
  };

  const handleSliderChange2 = (event, newValue) => {
    setTerm(newValue);
  };

  const handleSliderChange3 = (event, newValue) => {
    setAPR(newValue);
  };

  const formatNumber = (number) => number.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2,});

  const calculateLoanInterest = () => {
    // Convert APR to monthly interest rate
    const monthlyInterestRate = APR / 100 / 12;
  
    // Calculate monthly payment using the formula for an amortizing loan
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term);
    const denominator = Math.pow(1 + monthlyInterestRate, term) - 1;
    const monthlyPayment = amountFinanced * (numerator / denominator);
  
    // Calculate total amount paid over the loan term
    const totalAmountPaid = monthlyPayment * term;
  
    // Calculate total interest paid
    const totalInterestPaid = totalAmountPaid - amountFinanced;
  
    // Calculate interest paid per month
    const interestPaidPerMonth = totalInterestPaid / term;
  
    // Calculate total of amount financed and interest paid
    const totalAmountFinancedAndInterest = amountFinanced + totalInterestPaid;

    if (!hasCalculated) {
      setHasCalculated(true);
    }

    setTotalInterestPaid(formatNumber(totalInterestPaid));
    setInterestPaidPerMonth(formatNumber(interestPaidPerMonth));
    setTotalAmountFinancedAndInterest(formatNumber(totalAmountFinancedAndInterest));
  }

  return (
    <CssBaseline>
      <div className='nav-header'>
        <a className='home-btn' href="#">
          <img src="//venom-assets.edmunds-media.com/786f855a0819e01fc31f37a596464b29.svg" alt="Home" />
        </a>
        {
          isWindowSmall && <MenuIcon className='mobile-menu'/>
        }
        {
          !isWindowSmall && 
          <>
            <a href="#">New Car Pricing</a>
            <a href="#">Used Car Pricing</a>
            <a href="#">Appraise My Car</a>
            <a href="#">Car Reviews</a>
          </>
        }
      </div>
      <Container component="main" maxWidth="lg">
          <Typography style={{margin: '48px 0px 24px 0px'}} variant="h3" gutterBottom>
            Loan Cost Caluclator
          </Typography>
          <Typography variant="p" style={{fontSize: '20px'}}>
            Calculate how much interest you will be paying over the total length of your loan.
          </Typography>
          <div className='calculator-container'>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <div className='sliders-wrapper'>
                  {/* Slider 1 */}
                  <div className='slider-wrapper'>
                    <div className='slider-label'>
                      <Typography variant="p">Amount Financed</Typography>
                        <Paper style={{padding: '4px'}}>
                          <Typography variant="p">$ {amountFinanced.toLocaleString()}</Typography>
                        </Paper>
                    </div>
                    <Slider
                      min={5000}
                      max={100000}
                      step={1000}
                      value={amountFinanced} onChange={handleSliderChange1} aria-label="Slider 1"
                    />
                  </div>
                  
                  {/* Slider 2 */}
                  <div className='slider-wrapper'>
                    <div className='slider-label'>
                      <Typography variant="p">Term</Typography>
                      <Paper style={{padding: '4px'}}>
                        <Typography variant="p">{term} months</Typography>
                      </Paper>
                    </div>
                    <Slider value={term} onChange={handleSliderChange2} aria-label="Slider 2" />
                  </div>

                  {/* Slider 3 */}
                  <div className='slider-wrapper'>
                    <div className='slider-label'>
                      <Typography variant="p">APR</Typography>
                      <Paper style={{padding: '4px'}}>
                        <Typography variant="p">{APR.toFixed(2)} %</Typography>
                      </Paper>
                    </div>
                    <Slider
                      value={APR} onChange={handleSliderChange3} aria-label="Slider 3"
                      min={1.99}
                      max={10}
                      step={.01}
                    />
                  </div>
                  {
                    !isWindowSmall &&
                    <Button className='calculate-btn' variant="contained" onClick={calculateLoanInterest}>
                      Calculate
                    </Button>
                  }
                </div>
                {
                  isWindowSmall &&
                  <Button className='calculate-btn' variant="contained" onClick={calculateLoanInterest} style={{marginTop: '36px'}}>
                    Calculate
                  </Button>
                }
              </Grid>
              {/* Right Column Content */}
              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                <div className='calculation-wrapper'>
                  <div className='total-interest-wrapper'>
                    <Typography variant="p" style={{color: 'gray'}}>Total interest</Typography>
                    <Typography variant="h2" style={{ fontWeight: '500'}}>${totalInterestPaid.toLocaleString()}</Typography>
                  </div>
                  <div className='metric-wrapper'>
                    <div className='metric' style={{ borderRight: '1px solid grey'}}>
                      <Typography variant="p" style={{color: 'gray'}}>Monthly payments</Typography>
                      <Typography variant="h6" style={{ fontWeight: '600'}}>${interestPaidPerMonth.toLocaleString()}</Typography>
                    </div>
                    <div className='metric'>
                      <Typography variant="p" style={{color: 'gray'}}>Total amount</Typography>
                      <Typography variant="h6" style={{ fontWeight: '600'}}>${totalAmountFinancedAndInterest.toLocaleString()}</Typography>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
      </Container>
    </CssBaseline>
  );
}

export default App;