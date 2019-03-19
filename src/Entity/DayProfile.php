<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DayProfileRepository")
 */
class DayProfile
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $DayProfile;

    /**
     * @ORM\Column(type="integer")
     */
    private $foodId;

    /**
     * @ORM\Column(type="integer")
     */
    private $meal;

    /**
     * @ORM\Column(type="integer")
     */
    private $amount;
    
    public function getId()
    {
        return $this->id;
    }
    public function getDay()
    {
        return $this->DayProfile;
    }
        
        public function setDay($Day)
    {
        $this->DayProfile = $Day;
    }

    public function getFoodId()
    {
        return $this->foodId;
    }

    public function setFoodId($foodId)
    {
        $this->foodId = $foodId;
    }

    public function getMeal()
    {
        return $this->meal;
    }
        
        public function setMeal($meal)
    {
        $this->meal = $meal;
    }

    public function getAmount()
    {
        return $this->amount;
    }
        
        public function setAmount($Amount)
    {
        $this->amount = $Amount;
    }
}
