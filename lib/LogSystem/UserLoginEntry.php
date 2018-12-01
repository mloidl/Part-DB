<?php
/**
 * Created by PhpStorm.
 * User: janhb
 * Date: 06.02.2018
 * Time: 18:52
 */

namespace PartDB\LogSystem;

use Exception;
use PartDB\Database;
use PartDB\Log;
use PartDB\User;

class UserLoginEntry extends BaseEntry
{
    protected $ip_address;

    /**
     * Constructor
     *
     * @note  It's allowed to create an object with the ID 0 (for the root element).
     *
     * @param Database  &$database      reference to the Database-object
     * @param User      &$current_user  reference to the current user which is logged in
     * @param Log       &$log           reference to the Log-object
     * @param integer   $id             ID of the filetype we want to get
     *
     * @throws Exception    if there is no such attachement type in the database
     * @throws Exception    if there was an error
     */
    public function __construct(Database &$database, User &$current_user, Log &$log, int $id, $db_data = null)
    {
        parent::__construct($database, $current_user, $log, $id, $db_data);

        //Check if we have selcted the right type
        if ($this->getTypeID() != Log::TYPE_USERLOGIN) {
            throw new \RuntimeException(_("Falscher Logtyp!"));
        }

        if ($this->getTargetType() != Log::TARGET_TYPE_USER) {
            throw new \RuntimeException(_("Falscher Targettyp!"));
        }

        $arr = $this->deserializeExtra();
        $this->ip_address = $arr["i"];
    }


    public function getExtra(bool $html = false) : string
    {
        return _("Von IP: ") . $this->ip_address;
    }

    /**
     * Adds a new log entry to the database.
     * @param $database Database The database which should be used for requests.
     * @param $current_user User The database which should be used for requests.
     * @param $log Log The database which should be used for requests.
     * @param $user User The user that logs in.
     * @param $ip_address string The ip adress the user loggs in from
     *
     * @return static|BaseEntry The new created Entry.
     *
     * @throws Exception
     */
    public static function add(Database &$database, User &$current_user, Log &$log, User $user, string $ip_address = "")
    {
        $arr = array("i" => $ip_address);

        return static::addEntry(
            $database,
            $current_user,
            $log,
            Log::TYPE_USERLOGIN,
            Log::LEVEL_INFO,
            $user->getID(),
            Log::TARGET_TYPE_USER,
            $user->getID(),
            $arr
        );
    }

    /**
     * Returns the a text representation of the target
     * @return string The text describing the target
     */
    public function getTargetText() : string
    {
        try {
            $user = new User($this->database, $this->current_user, $this->log, $this->getTargetID());
            return $user->getName();
        } catch (Exception $ex) {
            return "ERROR!";
        }
    }

    /**
     * Return a link to the target. Returns empty string if no link is available.
     * @return string the link to the target.
     */
    public function getTargetLink() : string
    {
        return BASE_RELATIVE . "user_info?uid=" . $this->getTargetID();
    }
}
