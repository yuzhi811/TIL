# Join

### Inner join

> Inner join produces only the set of records that match in both Table A and Table B.
> a , b table 양쪽에만 있는 정보 출력, 새로운 테이블을 만드는 것. NULL이 존재하지 않는다. 합집합. b에서 가져와서 a와 결합해도 같은 결과. cemetrical..

```
SELECT * FROM tableA
INNER JOIN tableB
ON tableA.col_match = tableB.col.match

SELECT reg_id, Logins.name, log_id
FROM Registrations
INNER JOIN Logins
ON Registrations.name = Logins.name
```

> 컬럼이 겹칠 경우 .을 통해 명시하여 select해야 함.

- 서로 관계가 있는 레코드: INNER
- 관계가 없는 레코드: OUTER
  JOIN시 관계가 없는 레코드들은 제외, 자식이 참조하는 수만큼의 부모를 복제한 뒤 JOIN(자식이 가진 레코드의 수만큼이 inner join의 결과수와 SAME)
  - 자식엔 있고 부모엔 없는 경우: OUTER이기 때문에

### Left join

> Left join produces a complete set of records from Table A, with the matching records (where available) in Table B. If there is no match, the right side will contain null.

- \*\*\*왼쪽에 있는 outer(=관계 없는 값) 를 포함하겠다 left outer join... 결국 inner join + LEFT OUTER join
- 양쪽의 모든 outer를 포함

```
SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.aid LEFT JOIN profile ON author.profile_id = profile.pid WHERE 'author_id' = 1;
```

a 테이블에 있는 정보 출력. 가장 많이 사용된다: 어떤 특정한 테이블을 기준으로 정보를 가져올 떄 b에는 없는 정보도 가져와야 하는 경우가 많아서

## LEFT JOIN시 NULL값=> 왼쪽 테이블에는 값이 있는데 그 값과 그 값에 해당하는 오른쪽 테이블에는 행이 없다는 것을 알 수 있다.

> results in the set of records that are in the left table, if there is no match with the right table, the results are null. 대칭x

```
SELECT * FROM tableA
LEFT OUTER JOIN tableB
ON tableA.col_match = tableB.col_match
```

- What if we only wanted entires unique to tableA?

```SELECT * FROM tableA
LEFT JOIN tableB
ON tableA.col = tableB.col
WHERE tableB.id IS NULL
```

!!오직 왼쪽 테이블에 있는 값만 추출

```
SELECT film_id, title, inventory_id, store_id
FROM film
LEFT JOIN inventory
ON inventory.film.id = film.film_id
WHERE inventory.film_id IS NULL
```

film테이블에만 있거나, film&inventory의 교집합인 컬럼만 확인(film테이블의 일부행에는 inventory테이블에 해당되는 행이 없는 경우도 있음)

### Full Outer Join

- 결합되는 테이블 중 하나에만 표시되는 값을 처리하는 방식을 지정. to specify how to deal with values only present in one of the tables being joined.
  > Grab everything
  > BARELY USED...  
  > table a and table b + table a + table b 그리고 매치되지 않는 값에 대해서는 null값을 반환함
  > left join과 right join의 결과에서 중복을 제거하면. ('UNION')

* union: 컬럼이 아닌 레코드를 합치는 (컬럼 갯수, 자료형만 맞으면. ) 중복 제거

### Exclusive join

#### More complex example

```
SELECT COUNT(c.Name) AS TotalCities, country.Continent
FROM city AS c
RIGHT JOIN country ON c.CountryCode = country.Code
WHERE c.Name LIKE '___' -- Cities where the name is 3 characters
GROUP BY country.Continent
HAVING TotalCities > 0
ORDER BY country.Continent;
```

# Subquery

구절의 순서를 바꿔야 하는 경우 사용 가능
You can also use multi-row comparisons with subqueries - IN, ANY, SOME, ALL

```
최신 등록순으로 정렬한 결과에서 상위 열명을 원하는 경우
SELECT *
FROM (SELECT * FROM member ORDER BY column DESC)
WHERE col between 1 and 10
```

```
평균 나이 이상인 회원
SELECT *
FROM member
WHERE age >= (SELECT AVG(age) FROM member)
```

1. Single Row SubQuery

```
SELECT *
    FROM [테이블 A]
    WHERE [컬럼 명] [단일 행 연산자] (SELECT [컬럼명] FROM [테이블 B] WHERE [조건절])
```

2. Multi Row SubQuery

```
SELECT *
    FROM [테이블 A]
    WHERE [컬럼 명] [다중 행 연산자] (SELECT [컬럼명] FROM [테이블 B] WHERE [조건절])
```

3. Multi Column SubQuery
   비교 대상과 컬럼 개수가 반드시 일치해야.

```
SELECT *
    FROM [테이블 A]
    WHERE [컬럼 1], [컬럼 2], ... IN (SELECT [컬럼1], [컬럼 2], ... FROM [테이블 B] WHERE [조건절])
```

4. FROM절 - Inline View

```
SELECT *
    FROM ([SELECT [컬럼 1], [컬럼 2], ... FROM [테이블] WHERE [조건절] ) AS InlineView_table
    WHERE [조건절]
```

5. SELECT절 - Scala SubQuery: 1행만 반환.

```
SELECT COL1, COL2, (SELECT [COL 3] FROM [테이블 명] WHERE [조건절]) AS COL3
    FROM [테이블 명]
    WHERE [조건절]
```

# INDEXES

0. ROWID 구조
   테이블에서 행의 위치를 지정하는 논리적인 주소값. 단지 테이블의 한 칼럼처럼 참조만 가능하며 데이터베이스에 값이 저장되지는 않는다.
   db에서 중복되지 않는 유일한 값으로 테이블에 새로운 행이 삽입되면 테이블 내부에서 pseudo 컬럼 형태로 자동적으로 생성된다.
   테이블의 특정 레코드를 랜덤하게 접근하기 위해 주로 사용된다.
   > rowid는 다음과 같은 형식으로 데이터를 저장

- Object번호 - 32bit (6자리)
- 상대 파일 번호 - 10bit (3자리): 데이터가 저장되는 물리적인 데이터 파일번호로 유일한 값
- 블록 번호 22bit(6자리)
- 데이터 번호(행 번호) - 16bit(3자리)
  => 80bit(18자리) =10byte

1. clustering indexes

- 실제 데이터 자체가 정렬
- 리프페이지 = 데이터페이지
- 테이블당 1개만 존재
- (1)primary key (2)unique + not null 제약조건 적용시 자동 생성

2. Non-clustring indexes

- 실제 데이터 페이지는 변함 없는 상태에서 별도의 인덱스 페이지가 존재 => 추가 공간 필요
- 테이블당 여러 개 존재
- 리프페이지에 실제 데이터 페이지 주소가 존재
- unique 제약조건 적용시 자동 생성
- 직접 index를 생성하는 경우 클러스터링 인덱스가 생성

  > 클러스터링+논클러스터링 인덱스 함께 적용 시 => 리프페이지에 클러스터링 인덱스가 적용된 컬럼의 실제 인덱스값이 존재

  3. cardinality
     어떤 컬럼에 인덱스를 적용해야 할까: 카디널리티(그룹 내 요소의 개수)가 높은 것 = 중복수치가 낮은 것
     ex) 성별: 그룹 내 요소의 개수가 적음. 카디널리티 낮음
     id, email, 주민번호 등이 적절하다
     (1) 카디널리티가 높은 컬럼
     (2) where, join, order by절에 자주 사용되는 컬럼 (조건절이 없다면 인덱스 미사용)
     (3) insert, update, delete가 자주 발생하지 않는 컬럼
     (4) 규모가 작지 않은 테이블

# View

https://coding-factory.tistory.com/417
독립적인 인덱스를 가질 수 없다 / alter view 사용 불가(정의를 변경할 수 없다) ※ 뷰는 ALTER문을 사용하여 변경할 수 없으므로 필요한 경우는 삭제한 후 재생성한다./

```
CREATE VIEW notice_view
AS
    SELECT N.id, N.title, N.writer_id, M.name, COUNT(c.id) cmt
    FROM member M
    RIGHT OUTER JOIN notice N ON M.id = N.writer_id
    LEFT OUTER JOIN comment C on N.id = c.notice_id
    GROUP BY N.id, N.title, N.writer_id, M.name;
```

```
SELECT * FROM notice_view
WHERE title LIKE '%title%'
ORDER BY seq DESC;
```

Reference:
Udemy
뉴렉처
우아한Tech-[10분 테코톡] 라라, 제로의 데이터베이스 인덱스

```

```
