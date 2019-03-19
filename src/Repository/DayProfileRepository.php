<?php

namespace App\Repository;

use App\Entity\DayProfile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method DayProfile|null find($id, $lockMode = null, $lockVersion = null)
 * @method DayProfile|null findOneBy(array $criteria, array $orderBy = null)
 * @method DayProfile[]    findAll()
 * @method DayProfile[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DayProfileRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, DayProfile::class);
    }

    // /**
    //  * @return DayProfile[] Returns an array of DayProfile objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DayProfile
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
