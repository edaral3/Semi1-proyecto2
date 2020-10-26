# Red
## VPC
````
CIDR: 172.96.0.0/16
````

### Subnets
|Name|CIDR|
|--|--|
|Privada|172.96.147.0/24|
|Pública|172.96.146.0/24|

### Route Tables
|Subnet|Destination|Target|
|--|--|--|
|Privada|172.96.0.0/16|Local|
|Pública|172.96.0.0/16|Local|
|Pública|0.0.0.0/0|Internet Gateway|

## Instances
|Name|Public IPv4 addresses|Private IPv4 addresses|Service|Port|
|--|--|--|--|--|
|private-instance|34.229.110.138|172.96.147.99|MongoDB|27017|
|public-instance|54.204.228.208|172.96.146.203|API-Rest|4000|
|public-instance|54.204.228.208|172.96.146.203|Web|80|

### Security Group
#### Private instance
|Type|Protocol|Port|Source|
|--|--|--|--|
|SSH|TCP|22|190.106.221.82/32|
|SSH|TCP|22|172.96.146.0/24|
|TCP|TCP|27017|190.106.221.82/32|
|TCP|TCP|27017|172.96.146.0/24|

#### Public instance
|Type|Protocol|Port|Source|
|--|--|--|--|
|HTTP|TCP|80|0.0.0.0/0|
|HTTP|TCP|80|::/0|
|SSH|TCP|22|190.106.221.82/32|
|TCP|TCP|27017|172.96.147.0/24|
