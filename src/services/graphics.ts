import { Department } from "@/util/models/BasicDepartment";
import { Dataset } from "@/util/models/Dataset";
import { t } from "i18next";

const graphColors = ["#f1852D", "#fdf3dd", "#924114", "#d0751a", "#f29a1a"]

/* GRAPHS FOR PROJECT */

export const getProductionPerAssociationsGraph = (data: any) => {
    let productionCocoa: {name: string, values: number[]}[] = [];
          
    for (const month of data.report.productionOfDryCocoa) {
      Object.keys(month).forEach(property => {
        if(productionCocoa.find(value => value.name == property)) {
          productionCocoa.find(value => value.name == property)?.values.push(month[property])
        } else {
          productionCocoa.push({name: property, values: [month[property]]})
        }
      });
    }

    return productionCocoa.map((value, index) => {
        return new Dataset(
          value.name,
          value.values,
          graphColors[index % 5]
        )
    })   
}

export const getProductionPerRegionsGraph = (data: any) => {
    let productionCocoa: {name: string, values: number[]}[] = [];
          
    for (const month of data.report.productionByRegions) {
      Object.keys(month).forEach(property => {
        if(productionCocoa.find(value => value.name == property)) {
          productionCocoa.find(value => value.name == property)?.values.push(month[property])
        } else {
          productionCocoa.push({name: property, values: [month[property]]})
        }
      });
    }

    return productionCocoa.map((value, index) => {
        return new Dataset(
          value.name,
          value.values,
          graphColors[index % 5]
        )
      })   
}

export const getPriceOfOrganicCocoaGraph = (data: any) => {
    return [
        new Dataset(
          t('home.usd_price'),
          data?.report.priceOfOrganicCocoa.map((value: any) => value.organicSoldPrice),
          graphColors[2]
        )
    ]
}

export const getTotalSalesGraph = (data: any) => {
    return [
        new Dataset(
          t('home.total_sales_usd'),
          data?.report.monthlySalesInUSD.map((value: any) => value.salesInUSD),
          graphColors[2]
        )
    ]
}

export const getTotalSalesGeneralGraph = (data: any) => {
  return [
      new Dataset(
        t('home.total_sales_usd'),
        data.map((value: any) => value.salesInUSD),
        graphColors[2]
      )
  ]
}

export const getTotalPulpGraph = (data: any) => {
  return [
      new Dataset(
        t('home.cocoa_pulp_collected'),
        data.map((value: any) => value.pulpKg),
        graphColors[2]
      )
  ]
}

export const getProductionOfDryCocoa = (data: any) => {
  let productionCocoa: {name: string, values: number[]}[] = [];
        
  for (const month of data) {
    Object.keys(month).forEach(property => {
      if(productionCocoa.find(value => value.name == property)) {
        productionCocoa.find(value => value.name == property)?.values.push(month[property])
      } else {
        productionCocoa.push({name: property, values: [month[property]]})
      }
    });
  }

  return productionCocoa.map((value, index) => {
      return new Dataset(
        value.name,
        value.values,
        graphColors[index % 5]
      )
    })   
}

export const getTotalSalesKgGraph = (data: any) => {
  let salesInKg: {name: string, values: number[]}[] = [];
        
  for (const month of data) {
    Object.keys(month).forEach(property => {
      if(salesInKg.find(value => value.name == property)) {
        salesInKg.find(value => value.name == property)?.values.push(month[property])
      } else {
        salesInKg.push({name: property, values: [month[property]]})
      }
    });
  }

  return salesInKg.map((value, index) => {
      return new Dataset(
        value.name,
        value.values,
        graphColors[index % 5]
      )
    })   
}

/* GRAPHS FOR BUYER */

export const getProductionByOriginGraph = (data: any) => {
    let productionCocoa: {name: string, values: number[]}[] = [];
          
    for (const month of data.report.productionByOrigin) {
      Object.keys(month).forEach(property => {
          if(productionCocoa.find(value => value.name == property)) {
            productionCocoa.find(value => value.name == property)?.values.push(month[property])
          } else {
            productionCocoa.push({name: property, values: [month[property]]})
          }
      
      });
    }

    return productionCocoa.map( (value, index) => {
        return new Dataset(
          value.name,
          value.values,
          graphColors[index % 5]
        )
      })   
}

export const getTotalSalesForBuyerGraph = (data: any) => {
    let totalSales: {name: string, values: number[]}[] = [];
          
    for (const month of data.report.internationalSalesInKg) {
      Object.keys(month).forEach(property => {

          if(totalSales.find(value => value.name == property)) {
              totalSales.find(value => value.name == property)?.values.push(month[property])
          } else {
              totalSales.push({name: property, values: [month[property]]})
          }
        
      });
    }

    return totalSales.map((value, index) => {
        return new Dataset(
          value.name,
          value.values,
          graphColors[index % 5]
        )
      })  
}