# rain-arrows

## 아키텍처
### bun + elysiaJS
- 가벼운 처리를 고빈도로 처리해야하는 상황

## 실행
### 백엔드
* elysia
``` 
$ make backend-elysia-start
```

* nest
``` 
$ make backend-nest-start
```

### 벤치
```
$ make bench-elysia
$ make bench-nest
```

### 메모
- 호출이 많은 경우 나중에 전송한 데이터가 먼저 처리되는 상황이 발생할 수 있음
  - 순서 변경은 웹서버 앞단에 로드 밸런서가 없더라도 concurrent하게 메시지들이 처리되면서 순서 역전이 발생할 수 있음
- 순차적으로 보내더라도 seqence가 바뀔수 있음 이전 sequence를 redis에 저장하는 방식으로는 오류가능성이 있음
  - redis에 sequence를 get/set하는 과정에서도 순서가 바뀔 수 있음
  - redlock등 분산락을 고려할수도 있지만 고성능 환경에서는 적합하지 않아보임 (결제 등에 활용)
- zset을 사용하고, score에 timestamp를 설정하여, 메시지 처리순서가 바뀌더라도 유실이나 검증오류가 발생하지 않도록 할 수 있음
- zset에 일정기간(보관주기) 데이터를 조절하여, 최근 데이터는 mongodb 조회 없이 redis조회만으로 처리를 끝낼수 있음
  - 조회범위를 timestamp로 받고, 조회범위 시작점이 zset의 가장오래된 데이터보다 큰 경우 적용
  - 이외 경우는 몽고디비로 처리
  