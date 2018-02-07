import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
import { GraphWidget } from '../widgets/graph-widget.component';
import { CustBarSnippetComponent } from '../snippets/cust-snippet-bar.component';
//import { HeroPointsSnippetBarComponent } from '../snippets/hero-points-snippet-bar.component';
import { DataType } from '../shared/data-types.enum';

import * as moment from 'moment';
import 'rxjs/add/operator/map';

// import Services
import { CustSnippetsService } from '../providers/cust-snippets.service';
import { MedalsService } from '../providers/medals.service';
//import { HeroPointsStatsService } from '../providers/hero-points-stats.service';

@Component({
  templateUrl: './hero-points.component.html',
})

export class HeroPointsComponent implements OnInit {

  order: string = 'heroPoints';

  public testList = [
    {
      group_name: [{
        5: {
          awarded: true,
          awarded_at: null,
          points: 0,
          threshold: 5,
        },
        10: {
          awarded: true,
          awarded_at: null,
          points: 0,
          threshold: 10,
        },
        25: {
          awarded: false,
          awarded_at: null,
          points: 0,
          threshold: 25,
        },
        total: 11,
      }],
      group_name2: [{
        10: {
          awarded: false,
          awarded_at: null,
          points: 0,
          threshold: 10,
        },
        total: 3,
      }],
    }
  ]

  public globalMedalList = [
    {
      group_name: [{
        threshold: {
          awarded: false,
          awarded_at: null,
          points: 0,
          threshold: 0,
        },
        total: 0,
      }],
    }
  ]

  public organisationMedalList = [{
    org_id: [{
      group_name: [{
        threshold: {
          awarded: false,
          awarded_at: null,
          points: 0,
          threshold: 0,
        },
        total: 0,
      }],
      name: '',
    }],
  }]

  public medals = {
    global: {
      group_name: {
        threshold: {
          awarded: false,
          awarded_at: "2017-01-01-T00:00:00Z",
          points: 0,
          threshold: 0,
        },
        total: 0,
      },
    },

    organisation: {
      org_id: {
        group_name: {
          threshold: {
            awarded: false,
            awarded_at: "2017-01-01-T00:00:00Z",
            multiplier: 0,
            points: 0,
            threshold: 0,
          },
          total: 0,
        },
        name: "Placeholder",
      }
    }
  };

  // Hero points stats
  public statsThisWeek = 0;
  public statsLastWeek = 0;
  public statsMax = 0;
  public statsSum = 0;
  public statsCount = 0;

  // Gets list of transactions
  public paginateConfig: PaginationInstance = {
    id: 'transpaginate',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };

  // Widgets to build graphs for data
  public widgetList = [
    {
      type: 'graph',
      name: 'hero_points_last_week',
      icon: 'icon-trophy',
      title: 'Hero Points Gained Last Week',
    },
  ];

  constructor(
    private api: ApiService,
    private medalsService: MedalsService,
    //private heroPointsStatsService: HeroPointsStatsService,
  ) {
    this.api.customerStats().subscribe(
      result => {
        //this.setWeekPurchaseList(result.weeks);
      },
      error => {
        console.log('Retrieval Error');
        console.log( error._body );
      }
    );
  }

  public heroPointsConfig = {
    totalPoints: 0,
    lastTransactionPoints: 0,
    totalTransactions: 0,
    localMultiplier: 1,
    fairMultiplier: 3,
  };

  ngOnInit(): void {
    this.medalsService.getMedals()
      .subscribe(
        result => {
          this.setGlobalMedalList(result.global),
          this.setOrganisationMedalList(result.organisation)
        }
      )
    /*
    this.heroPointsStatsService.getHeroPointsStats()
      .subscribe(
        result => {
          this.statsThisWeek = result.points.stats.this_week;
          this.statsLastWeek = result.points.stats.last_week;
          this.statsMax = result.points.stats.max;
          this.statsSum = result.points.stats.sum;
          this.statsCount = result.points.stats.count;
        }
      )
    */
  };

  public setGlobalMedalList( data:any ){
    this.globalMedalList = [
    {
        group_name: [{
          threshold: {
            awarded: data.group_name.threshold.awarded,
            awarded_at: data.group_name.threshold.awarded_at,
            points: data.group_name.threshold.points,
            threshold: data.group_name.threshold.threshold,
          },
        total: data.group_name.total,
      }],
    }]
  };

  public setOrganisationMedalList( data: any ){
    this.organisationMedalList = [{
      org_id: [{
        group_name: [{
          threshold: {
            awarded: data.org_id.group_name.threshold.awarded,
            awarded_at: data.org_id.group_name.threshold.awarded_at,
            points: data.org_id.group_name.threshold.points,
            threshold: data.org_id.group_name.threshold.threshold,
          },
          total: data.org_id.group_name.total,
        }],
        name: data.org_id.name,
      }],
    }]
  };

  public paginateLeadConfig: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 8,
    currentPage: 1
  };

  public userList = [
    {
      "userId": 1,
      "name": "Test User",
      "displayName": "Testy",
      "heroPoints": 35080
    },
    {
      "userId": 2,
      "name": "Rebekah Pugh",
      "displayName": "Rebekah",
      "heroPoints": 31973
    },
    {
      "userId": 3,
      "name": "Sybil Hutchinson",
      "displayName": "Sybil",
      "heroPoints": 29291
    },
    {
      "userId": 4,
      "name": "Tara Cleveland",
      "displayName": "Tara",
      "heroPoints": 10873
    },
    {
      "userId": 5,
      "name": "Amber Hutchinson",
      "displayName": "Amber",
      "heroPoints": 42679
    },
    {
      "userId": 6,
      "name": "Tamekah Fuller",
      "displayName": "Tamekah",
      "heroPoints": 30048
    },
    {
      "userId": 7,
      "name": "Belle Benton",
      "displayName": "Belle",
      "heroPoints": 22014
    },
    {
      "userId": 8,
      "name": "Nash Chang",
      "displayName": "Nash",
      "heroPoints": 35414
    },
    {
      "userId": 9,
      "name": "Hedley Stafford",
      "displayName": "Hedley",
      "heroPoints": 41201
    },
    {
      "userId": 10,
      "name": "Mia Bowen",
      "displayName": "Mia",
      "heroPoints": 7454
    },
    {
      "userId": 11,
      "name": "Candace Short",
      "displayName": "Candace",
      "heroPoints": 5163
    },
    {
      "userId": 12,
      "name": "Germaine Leach",
      "displayName": "Germaine",
      "heroPoints": 15311
    },
    {
      "userId": 13,
      "name": "Hayden Britt",
      "displayName": "Hayden",
      "heroPoints": 22962
    },
    {
      "userId": 14,
      "name": "Curran Reynolds",
      "displayName": "Curran",
      "heroPoints": 20994
    },
    {
      "userId": 15,
      "name": "Orlando Yang",
      "displayName": "Orlando",
      "heroPoints": 37064
    }
  ];

  public organisationList = [
    {
      "organisationId": 1,
      "name": "Test SuperMarket",
      "fairRating": 0.4,
      "location": "Market Street",
      "sector": 1
    },
    {
      "organisationId": 2,
      "name": "Local Cornershop",
      "fairRating": 2,
      "location": "South Road",
      "sector": 1
    },
    {
      "organisationId": 3,
      "name": "Local Butchers",
      "fairRating": 2.8,
      "location": "Bowerham Road",
      "sector": 1
    },
    {
      "organisationId": 4,
      "name": "Coffee Franchise",
      "fairRating": 0.8,
      "location": "Penny Street",
      "sector": 1
    },
    {
      "organisationId": 5,
      "name": "Local Cafe",
      "fairRating": 2.6,
      "location": "Dalton Square",
      "sector": 1
    }
  ];

  public medalList = [
    {
      "medalId": 1,
      "medalGroupId": 0,
      "name": "keen_shopper_1",
      "title": "Keen Shopper",
      "description": "Add 1 transaction to your account",
      "trackedStat": "transactions.transactionId + 1",
      "valueRequired": 1,
      "reward": 125,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 2,
      "medalGroupId": 0,
      "name": "keen_shopper_2",
      "title": "Keen Shopper II",
      "description": "Add 5 transactions to your account",
      "trackedStat": "transactions.transactionId + 1",
      "valueRequired": 5,
      "reward": 1000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 3,
      "medalGroupId": 0,
      "name": "keen_shopper_3",
      "title": "Keen Shopper III",
      "description": "Add 25 transactions to your account",
      "trackedStat": "transactions.transactionId + 1",
      "valueRequired": 25,
      "reward": 2500,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 4,
      "medalGroupId": 0,
      "name": "keen_shopper_4",
      "title": "Keen Shopper IV",
      "description": "Add 100 transactions to your account",
      "trackedStat": "transactions.transactionId + 1",
      "valueRequired": 100,
      "reward": 5000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 5,
      "medalGroupId": 0,
      "name": "keen_shopper_5",
      "title": "Keen Shopper V",
      "description": "Add 1000 transactions to your account",
      "trackedStat": "transactions.transactionId + 1",
      "valueRequired": 1000,
      "reward": 10000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 6,
      "medalGroupId": 1,
      "name": "fair_tradesman_1",
      "title": "Fair Tradesman",
      "description": "Earn 1 fair rating of 2.5 or more",
      "trackedStat": "transactions.fairRating",
      "valueRequired": 1,
      "reward": 125,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 7,
      "medalGroupId": 1,
      "name": "fair_tradesman_2",
      "title": "Fair Tradesman II",
      "description": "Earn 5 fair ratings of 2.5 or more",
      "trackedStat": "transactions.fairRating",
      "valueRequired": 5,
      "reward": 1000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 8,
      "medalGroupId": 1,
      "name": "fair_tradesman_3",
      "title": "Fair Tradesman III",
      "description": "Earn 25 fair ratings of 2.5 or more",
      "trackedStat": "transactions.fairRating",
      "valueRequired": 25,
      "reward": 2500,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 9,
      "medalGroupId": 1,
      "name": "fair_tradesman_4",
      "title": "Fair Tradesman IV",
      "description": "Earn 100 fair ratings of 2.5 or more",
      "trackedStat": "transactions.fairRating",
      "valueRequired": 100,
      "reward": 5000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 10,
      "medalGroupId": 1,
      "name": "fair_tradesman_5",
      "title": "Fair Tradesman V",
      "description": "Earn 1000 fair ratings of 2.5 or more",
      "trackedStat": "transactions.fairRating",
      "valueRequired": 1000,
      "reward": 10000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 11,
      "medalGroupId": 2,
      "name": "avid_voter_1",
      "title": "Avid Voter",
      "description": "Vote 1 time",
      "trackedStat": "user.timesVoted",
      "valueRequired": 1,
      "reward": 100,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 12,
      "medalGroupId": 2,
      "name": "avid_voter_2",
      "title": "Avid Voter II",
      "description": "Vote 5 times",
      "trackedStat": "user.timesVoted",
      "valueRequired": 5,
      "reward": 500,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 13,
      "medalGroupId": 2,
      "name": "avid_voter_3",
      "title": "Avid Voter III",
      "description": "Vote 25 times",
      "trackedStat": "user.timesVoted",
      "valueRequired": 25,
      "reward": 2500,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 14,
      "medalGroupId": 2,
      "name": "avid_voter_4",
      "title": "Avid Voter IV",
      "description": "Vote 50 times",
      "trackedStat": "user.timesVoted",
      "valueRequired": 50,
      "reward": 5000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 15,
      "medalGroupId": 2,
      "name": "avid_voter_5",
      "title": "Avid Voter V",
      "description": "Vote 100 times",
      "trackedStat": "user.timesVoted",
      "valueRequired": 100,
      "reward": 10000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 16,
      "medalGroupId": 3,
      "name": "local_loyalist_1",
      "title": "Local Loyalist",
      "description": "Earn 1 local score of 0.8 or more",
      "trackedStat": "transations.localScore",
      "valueRequired": 1,
      "reward": 125,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 17,
      "medalGroupId": 3,
      "name": "local_loyalist_2",
      "title": "Local Loyalist II",
      "description": "Earn 5 local scores of 0.8 or more",
      "trackedStat": "transations.localScore",
      "valueRequired": 5,
      "reward": 1000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 18,
      "medalGroupId": 3,
      "name": "local_loyalist_3",
      "title": "Local Loyalist III",
      "description": "Earn 25 local scores of 0.8 or more",
      "trackedStat": "transations.localScore",
      "valueRequired": 25,
      "reward": 2500,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 19,
      "medalGroupId": 3,
      "name": "local_loyalist_4",
      "title": "Local Loyalist IV",
      "description": "Earn 100 local scores of 0.8 or more",
      "trackedStat": "transations.localScore",
      "valueRequired": 100,
      "reward": 5000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 20,
      "medalGroupId": 3,
      "name": "local_loyalist_5",
      "title": "Local Loyalist V",
      "description": "Earn 1000 local scores of 0.8 or more",
      "trackedStat": "transations.localScore",
      "valueRequired": 1000,
      "reward": 10000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 21,
      "medalGroupId": 4,
      "name": "eager_explorer_1",
      "title": "Eager Explorer",
      "description": "Earn 1 local score of 0.2 or less and a fair rating of 2 or more",
      "trackedStat": "transations.localScore + transactions.fairRating",
      "valueRequired": 1,
      "reward": 100,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 22,
      "medalGroupId": 4,
      "name": "eager_explorer_2",
      "title": "Eager Explorer II",
      "description": "Earn 5 local scores of 0.2 or less and a fair rating of 2 or more",
      "trackedStat": "transations.localScore + transactions.fairRating",
      "valueRequired": 5,
      "reward": 500,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 23,
      "medalGroupId": 4,
      "name": "eager_explorer_3",
      "title": "Eager Explorer III",
      "description": "Earn 20 local scores of 0.2 or less and a fair rating of 2 or more",
      "trackedStat": "transations.localScore + transactions.fairRating",
      "valueRequired": 20,
      "reward": 1000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 24,
      "medalGroupId": 4,
      "name": "eager_explorer_4",
      "title": "Eager Explorer IV",
      "description": "Earn 50 local scores of 0.2 or less and a fair rating of 2 or more",
      "trackedStat": "transations.localScore + transactions.fairRating",
      "valueRequired": 50,
      "reward": 2500,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 25,
      "medalGroupId": 4,
      "name": "eager_explorer_5",
      "title": "Eager Explorer V",
      "description": "Earn 100 local scores of 0.2 or less and a fair rating of 2 or more",
      "trackedStat": "transations.localScore + transactions.fairRating",
      "valueRequired": 100,
      "reward": 5000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 26,
      "medalGroupId": 5,
      "name": "shopaholic",
      "title": "Shopaholic",
      "description": "Visit 5 different stores in one day",
      "trackedStat": "transactions.organisationId + transactions.time",
      "valueRequired": 5,
      "reward": 2500,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 27,
      "medalGroupId": 6,
      "name": "completionist_1",
      "title": "Completionist",
      "description": "Earn all medals for an individual store 1 time",
      "trackedStat": "user.storesCompleted",
      "valueRequired": 1,
      "reward": 5000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 28,
      "medalGroupId": 6,
      "name": "completionist_2",
      "title": "Completionist II",
      "description": "Earn all medals for an individual store 3 times",
      "trackedStat": "user.storesCompleted",
      "valueRequired": 3,
      "reward": 10000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 29,
      "medalGroupId": 6,
      "name": "completionist_3",
      "title": "Completionist III",
      "description": "Earn all medals for an individual store 10 times",
      "trackedStat": "user.storesCompleted",
      "valueRequired": 10,
      "reward": 25000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 30,
      "medalGroupId": 6,
      "name": "completionist_4",
      "title": "Completionist IV",
      "description": "Earn all medals for an individual store 25 times",
      "trackedStat": "user.storesCompleted",
      "valueRequired": 25,
      "reward": 50000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 31,
      "medalGroupId": 6,
      "name": "completionist_5",
      "title": "Completionist V",
      "description": "Earn all medals for an individual store 50 times",
      "trackedStat": "user.storesCompleted",
      "valueRequired": 50,
      "reward": 100000,
      "unlocked": "FALSE",
      "medalType": "global"
    },
    {
      "medalId": 32,
      "medalGroupId": 7,
      "name": "loyal_customer_1",
      "title": "Loyal Customer",
      "description": "Visit this store 2 times",
      "trackedStat": "transactions.organisationId",
      "valueRequired": 2,
      "reward": 100,
      "unlocked": "FALSE",
      "medalType": "organisation"
    },
    {
      "medalId": 33,
      "medalGroupId": 7,
      "name": "loyal_customer_2",
      "title": "Loyal Customer II",
      "description": "Visit this store 5 times",
      "trackedStat": "transactions.organisationId",
      "valueRequired": 5,
      "reward": 500,
      "unlocked": "FALSE",
      "medalType": "organisation"
    },
    {
      "medalId": 34,
      "medalGroupId": 7,
      "name": "loyal_customer_3",
      "title": "Loyal Customer III",
      "description": "Visit this store 10 times",
      "trackedStat": "transactions.organisationId",
      "valueRequired": 10,
      "reward": 1000,
      "unlocked": "FALSE",
      "medalType": "organisation"
    },
    {
      "medalId": 35,
      "medalGroupId": 7,
      "name": "loyal_customer_4",
      "title": "Loyal Customer IV",
      "description": "Visit this store 25 times",
      "trackedStat": "transactions.organisationId",
      "valueRequired": 25,
      "reward": 2500,
      "unlocked": "FALSE",
      "medalType": "organisation"
    },
    {
      "medalId": 36,
      "medalGroupId": 7,
      "name": "loyal_customer_5",
      "title": "Loyal Customer V",
      "description": "Visit this store 50 times",
      "trackedStat": "transactions.organisationId",
      "valueRequired": 50,
      "reward": 5000,
      "unlocked": "FALSE",
      "medalType": "organisation"
    },
    {
      "medalId": 37,
      "medalGroupId": 8,
      "name": "opinionated",
      "title": "Opinionated",
      "description": "Vote on this store",
      "trackedStat": "transactions.organisationId + votes.organisationId",
      "valueRequired": 1,
      "reward": 100,
      "unlocked": "FALSE",
      "medalType": "organisation"
    },
    {
      "medalId": 38,
      "medalGroupId": 9,
      "name": "devoted_customer",
      "title": "Devoted Customer",
      "description": "Visit this store 5 times in a week",
      "trackedStat": "transactions.organisationId + transactions.time",
      "valueRequired": 5,
      "reward": 2500,
      "unlocked": "FALSE",
      "medalType": "organisation"
    },
    {
      "medalId": 39,
      "medalGroupId": 10,
      "name": "repeat_customer",
      "title": "Repeat Customer",
      "description": "Visit this store twice in one day",
      "trackedStat": "transactions.organisationId + transactions.time",
      "valueRequired": 2,
      "reward": 2500,
      "unlocked": "FALSE",
      "medalType": "organisation"
    }
  ];

  public transactionList = [
  {
    "transactionId": 0,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£34.43",
    "time": "2017-11-14 0:35:31",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 0
  },
  {
    "transactionId": 1,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£21.96",
    "time": "2017-11-14 10:43:02",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 0
  },
  {
    "transactionId": 2,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£18.55",
    "time": "2017-11-17 21:37:38",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 0
  },
  {
    "transactionId": 3,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£5.29",
    "time": "2017-11-18 1:59:55",
    "fairRating": 2.8,
    "localRating": 0.4,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 0
  },
  {
    "transactionId": 4,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£24.24",
    "time": "2017-11-18 9:39:41",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 0
  },
  {
    "transactionId": 5,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£15.33",
    "time": "2017-11-19 2:09:57",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 1
  },
  {
    "transactionId": 6,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£19.00",
    "time": "2017-11-19 7:04:01",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 1
  },
  {
    "transactionId": 7,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£24.05",
    "time": "2017-11-19 22:11:41",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 1
  },
  {
    "transactionId": 8,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£5.92",
    "time": "2017-11-19 22:27:28",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 1
  },
  {
    "transactionId": 9,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£26.74",
    "time": "2017-11-20 12:03:54",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 1
  },
  {
    "transactionId": 10,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£9.97",
    "time": "2017-11-21 11:12:22",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 1
  },
  {
    "transactionId": 11,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£31.83",
    "time": "2017-11-21 22:59:30",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 1
  },
  {
    "transactionId": 12,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£29.82",
    "time": "2017-11-22 18:23:44",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 1
  },
  {
    "transactionId": 13,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£11.61",
    "time": "2017-11-22 18:26:51",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 1
  },
  {
    "transactionId": 14,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£23.50",
    "time": "2017-11-23 14:52:59",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 1
  },
  {
    "transactionId": 15,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£25.57",
    "time": "2017-11-23 21:41:42",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 1
  },
  {
    "transactionId": 16,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£11.80",
    "time": "2017-11-24 11:18:53",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 1
  },
  {
    "transactionId": 17,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£16.23",
    "time": "2017-11-25 11:42:49",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 1
  },
  {
    "transactionId": 18,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£4.98",
    "time": "2017-11-26 15:48:24",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 2
  },
  {
    "transactionId": 19,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£27.32",
    "time": "2017-11-29 3:34:22",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 2
  },
  {
    "transactionId": 20,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£11.97",
    "time": "2017-11-29 17:18:18",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 2
  },
  {
    "transactionId": 21,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£30.43",
    "time": "2017-11-30 7:02:36",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 2
  },
  {
    "transactionId": 22,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£19.62",
    "time": "2017-11-30 13:00:46",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 2
  },
  {
    "transactionId": 23,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£10.61",
    "time": "2017-11-30 17:08:44",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 2
  },
  {
    "transactionId": 24,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£13.81",
    "time": "2017-12-01 9:52:39",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 2
  },
  {
    "transactionId": 25,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£30.78",
    "time": "2017-12-01 11:17:11",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 2
  },
  {
    "transactionId": 26,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£13.19",
    "time": "2017-12-03 4:49:25",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 3
  },
  {
    "transactionId": 27,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£13.24",
    "time": "2017-12-03 17:20:18",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 3
  },
  {
    "transactionId": 28,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£18.35",
    "time": "2017-12-04 20:05:41",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 3
  },
  {
    "transactionId": 29,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£13.88",
    "time": "2017-12-05 13:27:37",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 3
  },
  {
    "transactionId": 30,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£27.78",
    "time": "2017-12-05 18:57:20",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 3
  },
  {
    "transactionId": 31,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£27.92",
    "time": "2017-12-07 0:39:35",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 3
  },
  {
    "transactionId": 32,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£3.43",
    "time": "2017-12-07 9:44:27",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 3
  },
  {
    "transactionId": 33,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£24.01",
    "time": "2017-12-09 17:20:02",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 3
  },
  {
    "transactionId": 34,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£13.08",
    "time": "2017-12-10 20:44:46",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 4
  },
  {
    "transactionId": 35,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£3.60",
    "time": "2017-12-12 5:09:49",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 4
  },
  {
    "transactionId": 36,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£7.62",
    "time": "2017-12-12 19:33:24",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 4
  },
  {
    "transactionId": 37,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£18.71",
    "time": "2017-12-13 6:15:07",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 4
  },
  {
    "transactionId": 38,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£11.61",
    "time": "2017-12-15 4:22:42",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 4
  },
  {
    "transactionId": 39,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£14.78",
    "time": "2017-12-15 7:50:18",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 4
  },
  {
    "transactionId": 40,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£2.88",
    "time": "2017-12-16 8:45:36",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 4
  },
  {
    "transactionId": 41,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£4.40",
    "time": "2017-12-16 11:27:55",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 4
  },
  {
    "transactionId": 42,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£19.64",
    "time": "2017-12-18 0:24:37",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 5
  },
  {
    "transactionId": 43,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£19.66",
    "time": "2017-12-19 0:11:25",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 5
  },
  {
    "transactionId": 44,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£26.58",
    "time": "2017-12-20 17:31:57",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 5
  },
  {
    "transactionId": 45,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£16.22",
    "time": "2017-12-21 3:07:22",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 5
  },
  {
    "transactionId": 46,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£11.30",
    "time": "2017-12-21 9:35:19",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 5
  },
  {
    "transactionId": 47,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£2.62",
    "time": "2017-12-21 21:07:57",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 5
  },
  {
    "transactionId": 48,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£32.59",
    "time": "2017-12-22 17:28:20",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 5
  },
  {
    "transactionId": 49,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£5.22",
    "time": "2017-12-24 6:20:00",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 6
  },
  {
    "transactionId": 50,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£31.60",
    "time": "2017-12-24 8:41:32",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 6
  },
  {
    "transactionId": 51,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£17.46",
    "time": "2017-12-25 1:47:58",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 6
  },
  {
    "transactionId": 52,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£19.18",
    "time": "2017-12-25 18:19:31",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 6
  },
  {
    "transactionId": 53,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£25.57",
    "time": "2017-12-25 18:43:26",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 6
  },
  {
    "transactionId": 54,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£17.01",
    "time": "2017-12-26 1:30:14",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 6
  },
  {
    "transactionId": 55,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£1.31",
    "time": "2017-12-27 17:19:03",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 6
  },
  {
    "transactionId": 56,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£10.20",
    "time": "2017-12-27 20:45:09",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 6
  },
  {
    "transactionId": 57,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£3.17",
    "time": "2017-12-28 13:19:16",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 6
  },
  {
    "transactionId": 58,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£25.79",
    "time": "2017-12-29 4:20:22",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 6
  },
  {
    "transactionId": 59,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£29.45",
    "time": "2017-12-30 9:47:52",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 6
  },
  {
    "transactionId": 60,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£17.21",
    "time": "2017-12-30 15:10:29",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 6
  },
  {
    "transactionId": 61,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£4.33",
    "time": "2017-12-31 1:25:40",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 7
  },
  {
    "transactionId": 62,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£17.35",
    "time": "2017-12-31 22:49:31",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 7
  },
  {
    "transactionId": 63,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£13.11",
    "time": "2018-01-01 4:39:26",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 7
  },
  {
    "transactionId": 64,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£30.45",
    "time": "2018-01-02 22:20:23",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 7
  },
  {
    "transactionId": 65,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£3.97",
    "time": "2018-01-03 8:12:05",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 7
  },
  {
    "transactionId": 66,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£19.61",
    "time": "2018-01-04 0:35:22",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 7
  },
  {
    "transactionId": 67,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£11.30",
    "time": "2018-01-04 7:10:27",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 7
  },
  {
    "transactionId": 68,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£23.80",
    "time": "2018-01-04 21:38:35",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 7
  },
  {
    "transactionId": 69,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£27.67",
    "time": "2018-01-05 12:32:34",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 7
  },
  {
    "transactionId": 70,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£1.32",
    "time": "2018-01-07 3:02:02",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 8
  },
  {
    "transactionId": 71,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£16.01",
    "time": "2018-01-09 17:16:18",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 8
  },
  {
    "transactionId": 72,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£15.87",
    "time": "2018-01-11 22:09:27",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 8
  },
  {
    "transactionId": 73,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£15.28",
    "time": "2018-01-14 3:47:58",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 9
  },
  {
    "transactionId": 74,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£13.91",
    "time": "2018-01-14 9:08:59",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 9
  },
  {
    "transactionId": 75,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£8.06",
    "time": "2018-01-14 12:43:39",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 9
  },
  {
    "transactionId": 76,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£16.60",
    "time": "2018-01-14 16:05:22",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 9
  },
  {
    "transactionId": 77,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£1.30",
    "time": "2018-01-15 12:47:41",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 9
  },
  {
    "transactionId": 78,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£24.63",
    "time": "2018-01-15 20:34:42",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 9
  },
  {
    "transactionId": 79,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£1.85",
    "time": "2018-01-16 2:34:19",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 9
  },
  {
    "transactionId": 80,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£2.14",
    "time": "2018-01-16 3:46:23",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 9
  },
  {
    "transactionId": 81,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£34.38",
    "time": "2018-01-16 9:22:41",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 9
  },
  {
    "transactionId": 82,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£34.16",
    "time": "2018-01-16 11:02:52",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 9
  },
  {
    "transactionId": 83,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£16.32",
    "time": "2018-01-16 16:48:33",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 9
  },
  {
    "transactionId": 84,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£0.72",
    "time": "2018-01-18 6:03:58",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 9
  },
  {
    "transactionId": 85,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£4.87",
    "time": "2018-01-18 7:42:59",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 9
  },
  {
    "transactionId": 86,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£29.20",
    "time": "2018-01-18 9:17:18",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 9
  },
  {
    "transactionId": 87,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£34.66",
    "time": "2018-01-18 12:41:46",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 9
  },
  {
    "transactionId": 88,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£19.54",
    "time": "2018-01-18 22:29:38",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 9
  },
  {
    "transactionId": 89,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£8.10",
    "time": "2018-01-19 1:49:19",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 9
  },
  {
    "transactionId": 90,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£14.99",
    "time": "2018-01-19 16:51:14",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 9
  },
  {
    "transactionId": 91,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£23.99",
    "time": "2018-01-19 20:04:52",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 9
  },
  {
    "transactionId": 92,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£26.61",
    "time": "2018-01-21 6:52:00",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 10
  },
  {
    "transactionId": 93,
    "organisationId": 3,
    "organisationName": "Local Butchers",
    "value": "£22.94",
    "time": "2018-01-21 17:27:32",
    "fairRating": 2.8,
    "localRating": 0.8,
    "overallRating": 3.6,
    "pointsEarned": 460,
    "week": 10
  },
  {
    "transactionId": 94,
    "organisationId": 4,
    "organisationName": "Coffee Franchise",
    "value": "£10.15",
    "time": "2018-01-22 5:11:23",
    "fairRating": 0.8,
    "localRating": 0.4,
    "overallRating": 1.2,
    "pointsEarned": 220,
    "week": 10
  },
  {
    "transactionId": 95,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£5.31",
    "time": "2018-01-22 7:00:23",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 10
  },
  {
    "transactionId": 96,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£12.68",
    "time": "2018-01-22 7:15:59",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 10
  },
  {
    "transactionId": 97,
    "organisationId": 1,
    "organisationName": "Test SuperMarket",
    "value": "£23.56",
    "time": "2018-01-22 22:08:41",
    "fairRating": 0.4,
    "localRating": 0.2,
    "overallRating": 0.6,
    "pointsEarned": 160,
    "week": 10
  },
  {
    "transactionId": 98,
    "organisationId": 2,
    "organisationName": "Local Cornershop",
    "value": "£30.32",
    "time": "2018-01-25 11:10:56",
    "fairRating": 2,
    "localRating": 1,
    "overallRating": 3,
    "pointsEarned": 400,
    "week": 10
  },
  {
    "transactionId": 99,
    "organisationId": 5,
    "organisationName": "Local Cafe",
    "value": "£8.98",
    "time": "2018-01-25 11:15:23",
    "fairRating": 2.6,
    "localRating": 0.6,
    "overallRating": 3.2,
    "pointsEarned": 420,
    "week": 10
  }
];

transactionListWeek = [
  {
    "weekId": 0,
    "pointsEarned": 1860
  },
  {
    "weekId": 1,
    "pointsEarned": 4840
  },
  {
    "weekId": 2,
    "pointsEarned": 2380
  },
  {
    "weekId": 3,
    "pointsEarned": 2940
  },
  {
    "weekId": 4,
    "pointsEarned": 2920
  },
  {
    "weekId": 5,
    "pointsEarned": 2400
  },
  {
    "weekId": 6,
    "pointsEarned": 4360
  },
  {
    "weekId": 7,
    "pointsEarned": 3400
  },
  {
    "weekId": 8,
    "pointsEarned": 1220
  },
  {
    "weekId": 9,
    "pointsEarned": 6300
  },
  {
    "weekId": 10,
    "pointsEarned": 2460
  }
];

}
