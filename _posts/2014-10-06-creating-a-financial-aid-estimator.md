---
title: "Creating a Financial Aid Estimator"
date: "2014-10-06"
categories: 
  - "development"
tags: 
  - "net"
  - "financial-aid"
---

(**Disclaimer:** The Aid Estimator libraries are owned by my employer, the University of California, Santa Barbara. The views expressed in this post do not necessarily reflect the views of the University of California, Santa Barbara or the Regents of the University of California.)

The **[open-source Financial Aid Estimator libraries](https://github.com/ucsbfinaid/)** provide support for an institution creating their own [Net Price Calculator](http://nces.ed.gov/ipeds/resource/net_price_calculator.asp) as required by the Higher Education Opportunity Act.

Since every institution has a different approach to calculating financial aid, the libraries **do not actually include the code for the final aid estimation**. In other words, you won't find a `CalculateGrants()` or `EstimateLoans()` stuffed somewhere in the codebase. Instead you will find code to support everything up to and after that point (including input validation, expected family contribution calculation, cost of attendance estimation, and award output formatting).

The fact that these so-called "Aid Estimation" libraries do not include the actual code for estimating financial aid is definitely a source of confusion. I've tossed around the idea of providing more tools for financial aid estimation within the libraries, but it's a difficult decision as I'm not familiar with how different types of institutions calculate financial aid and I wouldn't want to pigeon hole the broad applicability of the codebase.

At the very least, I thought it might be helpful to explore how an institution _could_ make use of the Aid Estimator libraries for their own Net Price Calculator. To start, I'll break down and discuss each part of the [basic example provided in the GitHub wiki](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET/wiki/Integrating-an-Institution's-Financial-Aid-Formula).

I'll be making use of the .NET version, but keep in mind a [PHP version](https://github.com/ucsbfinaid/Financial-Aid-Estimator-PHP) and [legacy .NET 2.0 version](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET-2.0) are available as well.

## Gather User Input

First things first, you need to **gather input from the user**:

```csharp
// Collect user input using simplified formula
RawSimpleDependentEfcCalculatorArguments rawArgs = new RawSimpleDependentEfcCalculatorArguments();

rawArgs.MaritalStatus = inputMaritalStatus.SelectedValue;
rawArgs.StateOfResidency = inputStateOfResidency.SelectedValue;

rawArgs.ParentIncome = inputParentIncome.Text;
rawArgs.ParentOtherIncome = inputParentOtherIncome.Text;
rawArgs.ParentIncomeEarnedBy = inputParentIncomeEarnedBy.SelectedValue;
rawArgs.ParentIncomeTax = inputParentIncomeTax.Text;
rawArgs.ParentAssets = inputParentAssets.Text;

rawArgs.StudentIncome = inputStudentIncome.Text;
rawArgs.StudentOtherIncome = inputStudentOtherIncome.Text;
rawArgs.StudentIncomeTax = inputStudentIncomeTax.Text;
rawArgs.StudentAssets = inputStudentAssets.Text;

rawArgs.NumberInCollege = inputNumberInCollege.Text;
rawArgs.NumberInHousehold = inputNumberInHousehold.Text;
```

In this example (taken from the [GitHub wiki](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET/wiki/Integrating-an-Institution's-Financial-Aid-Formula)), the user's input is getting pulled from quick and dirty ASP.NET Web Forms Web Server Controls, but you are, of course, not limited here: you could easily pull in the inputs from parameters passed to an ASP.NET MVC Controller, from a set of dummy values you have put together yourself for unit testing, and so on.

It's important to notice that we are _not_ performing any validation ourselves here and that we are stuffing the input into a "raw" `RawSimpleDependentEfcCalculatorArguments` object. Don't panic about the lack of validation, though:

## Validation

```csharp
// Validate user input
AidEstimationValidator validator = new AidEstimationValidator();
DependentEfcCalculatorArguments args = validator.ValidateSimpleDependentEfcCalculatorArguments(rawArgs);

// If validation fails, display errors
if (validator.Errors.Any())
{
    // Display error message
    errorList.DataSource = validator.Errors;
    errorList.DataBind();
    return;
}
```

Here's the first place where you might realize why you're even bothering to use these libraries at all: **the validation is all handled for you**.

All we have to do here is pass in a `RawSimpleDependentEfcCalculatorArguments` object to a `AidEstimationValidator`. In return, we get a freshly-baked `DependentEfcCalculatorArguments` that we can use in the rest of the aid estimation process and our `AidEstimationValidator`'s `Error` property will be updated with any validation errors that occurred.

Check out the [wiki article on input validation](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET/wiki/Validating-User-Input) for more information on the error validation piece.

You may have noticed the word "Simple" in `RawSimpleDependentEfcCalculatorArguments` and `ValidateSimpleDependentEfcCalculatorArguments`. This is because we are using the **_simplified_ expected family contribution (EFC) formula**. The full formula includes [a large number of arguments](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET/blob/master/AidEstimation.EfcCalculation/Arguments/DependentEfcCalculatorArguments.cs). This is great for getting a more exact estimated EFC result (and, thus, a more exact estimation of financial aid), but it can be a bit of a headache for a user just trying to get a quick and rough estimate of their financial aid.

To alleviate that, the Aid Estimator libraries include a simplified formula that makes certain assumptions. For more information (including the full list of assumptions), check out the [wiki article on the simplified formula](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET/wiki/Simplified-Formula).

Whether or not we are using the full or simplified approach, we still end up with a `DependentEfcCalculatorArguments` that we can use for our next step:

## Calculating EFC

Next, we need to **calculate the expected family contribution (EFC)**: an important number used in determining a student's financial aid, calculated using [a federal formula (PDF)](http://ifap.ed.gov/efcformulaguide/attachments/091913EFCFormulaGuide1415.pdf). In a strict sense, the EFC is the amount of money that a student and their parents should be able to contribute to the costs of a student's education for a school year. In practice, however, the EFC is more often used as a number to help institutions calculate how much of various types of financial aid (grants, loans, and so on) should be awarded to a student. Either way, we need this number to estimate a student's financial aid.

Thankfully, this is easy:

```csharp
// Calculate EFC
EfcCalculator calculator = EfcCalculatorConfigurationManager.GetEfcCalculator("1314");
EfcProfile profile = calculator.GetDependentEfcProfile(args);
```

Before this will work, you will need to a [little set-up](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET/wiki/Getting-Started) (essentially, pop a XML file with the values used within the EFC calculation into a directory and reference it from your `Web.config`).

The `EfcProfile` object will contain the `StudentContribution`, `ParentContribution`, and `ExpectedFamilyContribution` (`StudentContribution` + `ParentContribution`). `ParentTotalIncome` is available too, if your institution makes use of that value for estimating financial aid.

## Calculating Cost of Attendance

Now that we have EFC, we will want to compare the EFC to the **total cost of a student attending an institution ("cost of attendance" or "COA")**. Similar to estimating financial aid, each institution will have a different approach to estimating their cost of attendance. However, the Aid Estimator libraries do include [support](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET/wiki/Cost-of-Attendance-Estimator) to help structure this information and make it readily available in the aid estimation process.

If we make use of the Aid Estimator's COA estimation logic, then estimating COA becomes as straightforward as estimating EFC:

```csharp
// Determine Cost of Attendance
CostOfAttendanceEstimator coaEstimator = CostOfAttendanceEstimatorConfigurationManager.GetCostOfAttendanceEstimator("1314");
CostOfAttendance coa = coaEstimator.GetCostOfAttendance(EducationLevel.Undergraduate, HousingOption.OnCampus);
```

## Estimating Financial Aid

Alright, so now we've reached the part where the Aid Estimator leaves you to your own devices: we have the student's expected family contribution (EFC) and cost of attendance (COA), **but each institution will need to estimate financial aid on their own**.

Again, each institution is going to do this differently, but for the sake of example, let's say _Logan University_ (incredibly prestigious, by the way) provides three "types" of financial aid:

- **Grants** (university grants, state grants, federal grants, etc.)
- **Self-Help** (loans, work-study, etc.)
- **Alternative Help** (parent loans for dependent students and alternative loans for independent students)

To calculate these amounts, we follow this process:

1. Calculate _Need_ (COA - EFC)
2. Award the student Grant _until_ they reach their _Need_ or their _Grant Eligibility_
3. Award the student Self-Help _until_ they reach their _Need_ or their _Self-Help Eligibility_
4. Award the student Alternative Help _until_ they reach their _Cost of Attendance_

(Again, keep in mind this is all make-believe. You'll find this is _kind of similar_ to how many institutions calculate financial aid awards, but definitely not reflective of any particular university)

You'll notice that within this simple formula we repeat a similar step over and over ("award X until we reach Y or the maximum X allowed"). So, to help with those steps, let's isolate that logic into a method:

```csharp
public int EstimateAward(int awardEligibility, int awardMaximum)
{
	int award = (awardEligibility >= awardMaximum) ? awardMaximum : awardEligibility;
	return award <= 0 ? 0 : award;
}
```

And an overloaded version for when we just want to provide a single value (but still do the "if less than zero check" above, just in case):

```csharp
public int EstimateAward(int awardEligibility)
{
	return EstimateAward(awardEligibility, awardEligibility);
}
```

Next, let's create a class to package all of this up nicely:

```csharp
public class AidSummary
{
	public int Grant { get; set;}
	public int SelfHelp { get; set;}
	public int AlternativeHelp { get; set; }

	public int Total { get { return Grant + SelfHelp + AlternativeHelp; } }
}
```

With all of that, writing the formula is pretty straightforward:

```csharp
public AidSummary EstimateFinancialAid(int efc, int coa)
{
	AidSummary summary = new AidSummary();

	// Calculate Need
	int need = coa - efc;
	int remainingNeed = need;

	// Calculate Grant
	const int GrantEligibility = 1000;
	summary.Grant = EstimateAward(GrantEligibility, need);
	remainingNeed -= summary.Total;

	// Calculate Self-Help
	const int SelfHelpEligibility = 2000;
	summary.SelfHelp = EstimateAward(SelfHelpEligibility, need);
	remainingNeed -= summary.Total;

	// Calculate Alternative Help
	summary.AlternativeHelp = EstimateAward(coa - summary.Total);

	return summary;
}
```

And an example to tie it all together:

```csharp
AidSummary summary = EstimateFinancialAid(3800, 5000);

int grant = summary.Grant; // 1000
int selfHelp = summary.SelfHelp; // 1200
int altHelp = summary.AlternativeHelp; // 2800
```

## Creating Ranges

Since your Net Price Calculator will be outputting _estimated_ values and not actual amounts, it can sometimes be helpful to **provide ranges rather than exact values** to the users of your estimator. Now that you have your calculated financial aid, let's take a look at how you could use the [Award Range](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET/wiki/Using-Award-Ranges) class to easily create ranges for output:

```csharp
AidSummary summary = EstimateFinancialAid(profile.ExpectedFamilyContribution, coa.Total);

// Output: Awards
AwardRange selfHelpRange = AwardRange.GetRangeFromValue(summary.SelfHelp, 1000);
AwardRange grantRange = AwardRange.GetRangeFromValue(summary.Grant, 1000);
AwardRange altHelpRange = AwardRange.GetRangeFromValue(summary.AlternativeHelp, 1000);
```

For each of the values we get back from the `EstimateFinancialAid` method we created above, we use the `AwardRange.GetRangeFromValue()` method to create a ranged value with the actual value as the lower bound and the actual value plus 1000 as the upper bound. In other words, if grant ended up as 2000, the resulting range would be 2000-3000.

## Displaying the Results

Now that we have finally estimated the financial aid, we can easily display the results to the user with the `AwardRange`'s handy overridden `ToString()` method, which will output the range in a nice, currency format (e.g.: "$600.00 - $720.00"):

```csharp
selfHelpAwardOutput.Text = selfHelpRange.ToString();
grantAwardOutput.Text = grantRange.ToString();
altHelpAwardOutput.Text = altHelpRange.ToString();
```

And there you go: you've created **your very own Net Price Calculator**!
