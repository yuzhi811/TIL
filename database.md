# Join

### Inner join

> Inner join produces only the set of records that match in both Table A and Table B.
> a , b table 양쪽에만 있는 정보 출력, 새로운 테이블을 만드는 것. NULL이 존재하지 않는다.

### Left join

> Left join produces a complete set of records from Table A, with the matching records (where available) in Table B. If there is no match, the right side will contain null.

```
SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.aid LEFT JOIN profile ON author.profile_id = profile.pid WHERE 'author_id' = 1;
```

a 테이블에 있는 정보 출력. 가장 많이 사용된다: 어떤 특정한 테이블을 기준으로 정보를 가져올 떄 b에는 없는 정보도 가져와야 하는 경우가 많아서

LEFT JOIN시 NULL값=> 왼쪽 테이블에는 값이 있는데 그 값과 그 값에 해당하는 오른쪽 테이블에는 행이 없다는 것을 알 수 있다.,

### Full Outer Join

BARELY USED...  
table a and table b + table a + table b
left join과 right join의 결과에서 중복을 제거하면. ('UNION')

### Exclusive join
